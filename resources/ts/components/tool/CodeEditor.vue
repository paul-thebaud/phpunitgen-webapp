<template>
  <codemirror
    v-if="show"
    :value="code"
    :options="codeMirrorOptions"
    @input="handleInput"
  />
</template>

<script lang="ts">
    import "codemirror/mode/javascript/javascript";
    import "codemirror/mode/php/php";
    import Vue from "vue";
    import { codemirror } from "vue-codemirror";
    import { Component, Prop } from "vue-property-decorator";
    import { Theme } from "@/container/concerns/theme";
    import { State } from "vuex-class";

    @Component({
        components: {
            codemirror,
        },
    })
    export default class CodeEditor extends Vue {
        @Prop(String)
        protected readonly code!: string;

        @Prop({ type: Boolean, default: true })
        protected readonly show!: boolean;

        @Prop({ type: Boolean, default: false })
        protected readonly readOnly!: boolean;

        @Prop({ type: String, default: "application/x-httpd-php" })
        protected readonly mode!: string;

        @State
        protected readonly theme!: Theme;

        protected get codeMirrorOptions(): object {
            return {
                viewportMargin: Infinity,
                theme: this.theme.getCodeMirror(),
                mode: this.mode,
                indentUnit: 4,
                tabSize: 4,
                lineNumbers: true,
                line: true,
                readOnly: this.readOnly,
            };
        }

        protected handleInput(code: string): void {
            this.$emit("input", code);
        }
    }
</script>

<style scoped>

</style>
