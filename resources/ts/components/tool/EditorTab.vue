<template>
  <div>
    <div class="my-3 d-flex">
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
        :disabled="code === '' || code === null || loading"
        variant="primary"
        class="ml-auto"
        @click="handleGenerate"
      >
        <FontAwesomeIcon icon="play-circle" />
        {{ $t("components.tool.editorTab.generate") }}
      </BButton>
    </div>
    <div v-if="exceptionMessage !== null && ! loading">
      <div class="d-flex mb-3">
        <BAlert
          :show="true"
          variant="danger"
          class="flex-grow-1 mr-2 mb-0"
        >
          {{ exceptionMessage }}
        </BAlert>
        <BButton
          v-if="exception !== null"
          variant="danger"
          class="align-self-center"
          @click="toggleShowExceptionEditor"
        >
          {{ showExceptionButtonLabel }}
        </BButton>
      </div>
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
    import { TestGeneratorResourceI } from "@/container/contracts/testGeneratorResourceI";
    import { TranslateResult } from "vue-i18n";

    @Component({
        components: {
            CodeEditor,
        }
    })
    export default class EditorTab extends Vue {
        public $refs!: {
            file: HTMLInputElement;
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

        protected debouncedSave = debounce(function (this: EditorTab) {
            this.store.setLastEditorContent(this.code).save();
        }, 250);

        public async created(): Promise<void> {
            const lastEditorContent = this.store.getLastEditorContent();
            if (lastEditorContent !== undefined) {
                this.code = lastEditorContent;

                return;
            }

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
