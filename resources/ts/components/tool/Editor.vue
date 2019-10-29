<template>
    <CodeMirror v-if="show"
                :value="code"
                :options="codeMirrorOptions"
                @input="handleInput"></CodeMirror>
</template>

<script lang="ts">
    import "@sass/components/tool/editor.scss";
    import Vue from "vue";
    import Component from "vue-class-component";
    import { Prop } from "vue-property-decorator";
    import { container } from "@/container/container";
    import { ThemeI } from "@/container/contracts/themeI";
    import { TYPES } from "@/container/types";
    import CodeMirror from "@/components/tool/CodeMirror.vue";

    const theme: ThemeI = container.get<ThemeI>(TYPES.Theme);

    @Component({
        components: {
            CodeMirror,
        },
    })
    export default class App extends Vue {
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
            theme: theme.getTheme().getCodeMirrorClass(),
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
