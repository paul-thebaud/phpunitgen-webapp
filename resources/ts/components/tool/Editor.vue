<template>
    <CodeMirror v-if="show"
                :code="code"
                :options="codeMirrorOptions"
                @input="handleInput"></CodeMirror>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Inject, Prop } from "vue-property-decorator";
    import { ThemeI } from "@/container/contracts/themeI";
    import { TYPES } from "@/container/types";
    import CodeMirror from "@/components/tool/CodeMirror.vue";

    @Component({
        components: {
            CodeMirror,
        },
    })
    export default class Editor extends Vue {
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
            theme: this.theme.getTheme().getCodeMirror(),
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
