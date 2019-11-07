<template>
    <BContainer class="my-5">
        <BRow>
            <BCol :class="forceTabDisplay ? '' : 'd-xl-none'"
                  class="editor-tabs d-flex"
                  cols="12">
                <div @click="displayedTab = 'editor'"
                     :class="displayedTab === 'editor' ? 'active' : ''"
                     class="editor-tabs__tab text-center">
                    <FontAwesomeIcon icon="terminal"></FontAwesomeIcon>
                    {{ $t("views.tool.editorTab") }}
                </div>
                <div @click="displayedTab = 'generated'"
                     :class="displayedTab === 'generated' ? 'active' : ''"
                     class="editor-tabs__tab text-center">
                    <FontAwesomeIcon icon="play"></FontAwesomeIcon>
                    {{ $t("views.tool.generatedTab") }}
                </div>
            </BCol>
            <BCol :xl="forceTabDisplay ? 12 : 6"
                  cols="12">
                <EditorTab @generate="handleGenerate"
                           :loading="loading"
                           :exception-message="exceptionMessage"
                           :exception="exception"
                           :class="displayedTab === 'editor' ? 'd-block' : (forceTabDisplay ? 'd-none' : 'd-none d-xl-block' )"/>
            </BCol>
            <BCol :xl="forceTabDisplay ? 12 : 6"
                  cols="12">
                <GeneratedTab :test="test"
                              :class="displayedTab === 'generated' ? 'd-block' : (forceTabDisplay ? 'd-none' : 'd-none d-xl-block' )"/>
            </BCol>
        </BRow>
    </BContainer>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Inject } from "vue-property-decorator";
    import EditorTab from "@/components/tool/EditorTab.vue";
    import { Test, TestResourceI } from "@/container/contracts/testResourceI";
    import { TYPES } from "@/container/types";
    import { UnknownError } from "@/errors/UnknownError";
    import GeneratedTab from "@/components/tool/GeneratedTab.vue";
    import { TranslateResult } from "vue-i18n";
    import { StoreI } from "@/container/contracts/storeI";

    @Component({
        components: { GeneratedTab, EditorTab }
    })
    export default class Tool extends Vue {
        @Inject(TYPES.Store)
        protected store!: StoreI;

        @Inject(TYPES.TestResource)
        protected testResource!: TestResourceI;

        protected forceTabDisplay = this.store.getForceEditorTabs();

        protected displayedTab = "editor";

        protected loading: boolean = false;

        protected exceptionMessage: TranslateResult | null = null;

        protected exception: object | null = null;

        protected test: Test | null = null;

        public async handleGenerate(code: string): Promise<void> {
            this.loading = true;

            try {
                this.test = await this.testResource.create(code);

                this.exceptionMessage = null;
                this.exception = null;

                this.displayedTab = "generated";
                // TODO Unlock theme if needed.
            } catch (error) {
                if (error instanceof UnknownError) {
                    this.exception = error.getException();
                } else {
                    this.exception = null;
                }

                this.exceptionMessage = this.$t("views.tool.exceptionMessage");
            }

            this.loading = false;
        }
    };
</script>
