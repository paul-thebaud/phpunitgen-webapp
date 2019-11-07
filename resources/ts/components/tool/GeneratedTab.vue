<template>
    <div>
        <div class="my-3 d-flex justify-content-end">
            <div class="mr-auto d-flex">
                <p v-if="hasCode" class="ml-2 my-auto">
                    {{ $t("components.tool.generatedTab.executionTime", { executionTime: formattedExecutionTime }) }}
                </p>
            </div>
            <BButton variant="secondary"
                     class="mr-2"
                     :disabled="! hasCode"
                     @click="handleCopy">
                <FontAwesomeIcon icon="copy"></FontAwesomeIcon>
                {{ copyButtonLabel }}
            </BButton>
            <BButton variant="secondary"
                     :disabled="! hasCode"
                     @click="handleDownload">
                <FontAwesomeIcon icon="download"></FontAwesomeIcon>
                {{ $t("components.tool.generatedTab.download") }}
            </BButton>
        </div>
        <BAlert :show="! hasCode"
                variant="warning">
            {{ $t("components.tool.generatedTab.missingCode") }}
        </BAlert>
        <Editor :show="hasCode"
                :code="test ? test.code : ''"
                :read-only="true"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-property-decorator";
    import { TranslateResult } from "vue-i18n";
    import Editor from "@/components/tool/Editor.vue";
    import { Test } from "@/container/contracts/testResourceI";

    @Component({
        components: {
            Editor
        }
    })
    export default class GeneratedTab extends Vue {
        @Prop(Object)
        protected test!: Test;

        protected copyButtonLabel: TranslateResult = "";

        public created(): void {
            this.copyButtonLabel = this.$t("components.tool.generatedTab.copy");
        }

        public get hasCode() {
            return this.test !== null;
        }

        public get formattedExecutionTime(): number {
            return Math.round(this.test.executionTime * 1000);
        }

        public handleCopy(): void {
            this.$copyText(this.test.code)
                .then(() => {
                    this.copyButtonLabel = this.$t("components.tool.generatedTab.copied");
                }, () => {
                    this.copyButtonLabel = this.$t("components.tool.generatedTab.copyFailure");
                });
        }

        public handleDownload(): void {
            const anchorElement = document.createElement("a");
            anchorElement.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(this.test.code)}`);
            anchorElement.setAttribute("download", `${this.test.name}.php`);
            anchorElement.style.display = "none";

            document.body.appendChild(anchorElement);
            anchorElement.click();
            document.body.removeChild(anchorElement);
        }
    };
</script>
