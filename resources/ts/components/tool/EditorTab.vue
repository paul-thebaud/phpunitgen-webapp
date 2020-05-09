<template>
  <div>
    <div class="my-3 d-flex flex-wrap flex-md-nowrap">
      <input
        ref="file"
        type="file"
        accept=".php"
        class="d-none"
        @change="handleFileChanged"
      >
      <BButton
        :to="{ name: 'configuration' }"
        :disabled="loading"
        variant="primary"
      >
        <FontAwesomeIcon icon="cog" />
        {{ $t("components.tool.editorTab.configure") }}
      </BButton>
      <BButton
        :disabled="loading"
        variant="secondary"
        class="ml-2"
        @click="handleFileBrowser"
      >
        <FontAwesomeIcon icon="file-import" />
        {{ $t("components.tool.editorTab.import") }}
      </BButton>
      <BButton
        v-b-tooltip.hover="{ title: $t('components.tool.editorTab.clearDescription'), interactive: false }"
        :disabled="loading"
        variant="secondary"
        class="mx-2"
        @click="handleClearEditor"
      >
        <FontAwesomeIcon icon="trash" />
        {{ $t("components.tool.editorTab.clear") }}
      </BButton>
      <div class="ml-auto">
        <div v-b-tooltip="{ title: $t('views.tool.offline'), disabled: online }">
          <BButton
            :disabled="code === '' || code === null || loading || ! online"
            variant="primary"
            class="ml-auto"
            @click="handleGenerate"
          >
            <FontAwesomeIcon
              v-if="! loading"
              icon="play-circle"
            />
            <FontAwesomeIcon
              v-if="loading"
              icon="circle-notch"
              class="fa-spin"
            />
            {{ $t("components.tool.editorTab.generate") }}
          </BButton>
        </div>
      </div>
    </div>
    <div v-if="exceptionMessage !== null && ! loading">
      <BAlert
        :show="true"
        variant="danger"
      >
        <div>
          <FontAwesomeIcon
            icon="exclamation-circle"
            class="mr-2"
          />
          {{ exceptionMessage }}
        </div>
        <div class="text-center">
          <BButton
            variant="danger"
            class="mt-2"
            @click="toggleShowExceptionEditor"
          >
            {{ showExceptionButtonLabel }}
          </BButton>
        </div>
      </BAlert>
      <CodeEditor
        v-if="showExceptionEditor"
        :code="JSON.stringify(exception, null, 2)"
        :read-only="true"
        mode="application/json"
      />
    </div>
    <CodeEditor
      v-if="! showExceptionEditor"
      :code="code"
      :read-only="loading"
      @input="handleEditorChange"
    />
  </div>
</template>

<script lang="ts">
    import debounce from "lodash.debounce";
    import Vue from "vue";
    import { Component, Inject, Prop } from "vue-property-decorator";
    import CodeEditor from "@/components/tool/CodeEditor.vue";
    import { StoreI } from "@/container/contracts/storeI";
    import { TYPES } from "@/container/types";
    import { TestGenerator, TestGeneratorResourceI } from "@/container/contracts/testGeneratorResourceI";
    import { TranslateResult } from "vue-i18n";
    import { GoogleAnalyticsI } from "@/container/contracts/googleAnalyticsI";

    @Component({
        components: {
            CodeEditor,
        },
    })
    export default class EditorTab extends Vue {
        public readonly $refs!: {
            file: HTMLInputElement;
        };

        @Inject(TYPES.Store)
        protected readonly store!: StoreI;

        @Inject(TYPES.TestGeneratorResource)
        protected readonly testGeneratorResource!: TestGeneratorResourceI;

        @Inject(TYPES.GoogleAnalytics)
        protected readonly googleAnalytics!: GoogleAnalyticsI;

        @Prop(Boolean)
        protected readonly loading!: boolean;

        @Prop(Boolean)
        protected readonly online!: boolean;

        @Prop(String)
        protected readonly exceptionMessage!: string;

        @Prop(Object)
        protected readonly exception!: object;

        protected testGenerator: TestGenerator | undefined;

        protected code = "";

        protected showException = false;

        protected debouncedSave = debounce(function (this: EditorTab) {
            // Do not save if the content is the same as example.
            if (this.testGenerator && this.code === this.testGenerator.example) {
                return;
            }

            this.store.setLastEditorContent(this.code).save();
        }, 250);

        public async created(): Promise<void> {
            const lastEditorContent = this.store.getLastEditorContent();
            if (lastEditorContent !== undefined) {
                this.code = lastEditorContent;

                return;
            }

            await this.handleClearEditor();
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

        public async handleClearEditor(): Promise<void> {
            if (this.online) {
                this.testGenerator = await this.testGeneratorResource.find(
                    this.store.getTool().testGenerator,
                );

                this.code = this.testGenerator.example;
            } else {
                this.code = "<?php\n\nclass Person {\n}\n";
            }
            this.store.setLastEditorContent(undefined);
        }

        public handleGenerate(): void {
            this.$emit("generate", this.code);

            if (this.googleAnalytics.isConfigured() && this.googleAnalytics.isAccepted()) {
                this.$gtag.event("generate", {
                    "event_category": "engagement",
                    "event_label": "Code generation request",
                });
            }
        }

        public handleEditorChange(code: string): void {
            this.code = code;

            this.debouncedSave();
        }

        public handleFileBrowser(): void {
            this.$refs.file.click();
        }

        public handleFileChanged(event: Event): void {
            if (! event.target) {
                return;
            }

            const file = this.$refs.file.files ? this.$refs.file.files[0] : undefined;

            if (! file) {
                return;
            }

            const fileReader = new FileReader();
            fileReader.onload = (): void => {
                this.code = fileReader.result as string;
            };
            fileReader.readAsText(file);
        }

        protected toggleShowExceptionEditor(): void {
            this.showException = ! this.showException;
        }
    }
</script>
