<template>
    <codemirror v-if="show"
                :value="code"
                :options="codeMirrorOptions"
                @input="handleInput"></codemirror>
</template>

<script lang="ts">
    import "codemirror/mode/javascript/javascript";
    import "codemirror/mode/php/php";
    import Vue from "vue";
    import { codemirror } from "vue-codemirror";
    import { Component, Inject, Prop } from "vue-property-decorator";
    import { ThemeI } from "@/container/contracts/themeI";
    import { TYPES } from "@/container/types";

    @Component({
        components: {
            codemirror,
        },
    })
    export default class CodeEditor extends Vue {
        @Inject(TYPES.Theme)
        protected theme!: ThemeI;

        @Prop(String)
        protected readonly code!: string;

        @Prop({ type: Boolean, default: true })
        protected readonly show!: boolean;

        @Prop({ type: Boolean, default: false })
        protected readonly readOnly!: boolean;

        @Prop({ type: String, default: "application/x-httpd-php" })
        protected readonly mode!: string;

        protected codeMirrorOptions = {
            viewportMargin: Infinity,
            theme: this.theme.currentTheme.getCodeMirror(),
            mode: this.mode,
            indentUnit: 4,
            tabSize: 4,
            lineNumbers: true,
            line: true,
            readOnly: this.readOnly,
        };

        protected handleInput(code: string) {
            this.$emit("input", code);
        }
    };
</script>

<style scoped>

</style>
