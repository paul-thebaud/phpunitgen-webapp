<template>
    <div>
        <div class="my-3 d-flex">
            <input @change="handleFileChanged"
                   ref="file"
                   type="file"
                   accept=".php"
                   class="d-none"/>
            <BButton :to="{ name: 'configuration' }"
                     :disabled="loading"
                     variant="primary">
                <FontAwesomeIcon icon="cog"></FontAwesomeIcon>
                {{ $t("components.tool.editorTab.configure") }}
            </BButton>
            <BButton @click="handleFileBrowser"
                     :disabled="loading"
                     variant="secondary"
                     class="ml-2">
                <FontAwesomeIcon icon="file-import"></FontAwesomeIcon>
                {{ $t("components.tool.editorTab.import") }}
            </BButton>
            <BButton @click="handleGenerate"
                     :disabled="code === '' || code === null || loading"
                     variant="primary"
                     class="ml-auto">
                <FontAwesomeIcon icon="play-circle"></FontAwesomeIcon>
                {{ $t("components.tool.editorTab.generate") }}
            </BButton>
        </div>
        <div v-if="exceptionMessage !== null && ! loading">
            <div class="d-flex mb-3">
                <BAlert :show="true"
                        variant="danger"
                        class="flex-grow-1 mr-2 mb-0">
                    {{ exceptionMessage }}
                </BAlert>
                <BButton v-if="exception !== null"
                         @click="toggleShowExceptionEditor"
                         variant="danger"
                         class="align-self-center">
                    {{ showExceptionButtonLabel }}
                </BButton>
            </div>
            <Editor v-if="showExceptionEditor"
                    :code="JSON.stringify(exception, null, 2)"
                    :read-only="true"
                    mode="application/json"/>
        </div>
        <Editor v-if="! showExceptionEditor"
                @input="handleEditorChange"
                :code="code"
                :read-only="loading"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Inject, Prop } from "vue-property-decorator";
    import Editor from "@/components/tool/Editor.vue";
    import { StoreI } from "@/container/contracts/storeI";
    import { TYPES } from "@/container/types";
    import { TestGeneratorResourceI } from "@/container/contracts/testGeneratorResourceI";
    import { TranslateResult } from "vue-i18n";

    @Component({
        components: {
            Editor
        }
    })
    export default class EditorTab extends Vue {
        public $refs!: {
            file: HTMLInputElement,
        };

        @Inject(TYPES.Store)
        protected store!: StoreI;

        @Inject(TYPES.TestGeneratorResource)
        protected testGeneratorResource!: TestGeneratorResourceI;

        @Prop(Boolean)
        protected loading!: boolean;

        @Prop(String)
        protected exceptionMessage!: string;

        @Prop(Object)
        protected exception!: object;

        protected code = "";

        protected showException = false;

        public async created(): Promise<void> {
            const testGenerator = await this.testGeneratorResource.find(
                this.store.getTool().testGenerator
            );

            this.code = testGenerator.example;
        }

        public get showExceptionEditor(): boolean {
            return this.exception !== null && this.showException;
        }


        public get showExceptionButtonLabel(): TranslateResult {
            if (this.showExceptionEditor) {
                return this.$t("components.tool.editorTab.hideException");
            }

            return this.$t("components.tool.editorTab.showException");
        }

        public handleGenerate(): void {
            this.$emit("generate", this.code);
        }

        public handleEditorChange(code: string): void {
            this.code = code;
        }

        public handleFileBrowser(): void {
            this.$refs.file.click();
        }

        public handleFileChanged(event: any): void {
            const file = event.target.files[0];

            if (! file) {
                return;
            }

            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.code = <string>fileReader.result;
            };
            fileReader.readAsText(file);
        }

        public toggleShowExceptionEditor(): void {
            this.showException = ! this.showException;
        }
    };
</script>
