<template>
    <codemirror v-if="show"
                :value="code"
                :options="codeMirrorOptions"
                @input="handleChange"></codemirror>
</template>

<script>
    import '@sass/components/tool/editor.scss';
    import 'codemirror/lib/codemirror.css';
    import 'codemirror/mode/javascript/javascript';
    import 'codemirror/mode/php/php';
    import { codemirror } from 'vue-codemirror';
    import Theme from '@/services/Theme';
    import { storage } from '@/services';

    export default {
        components: {
            codemirror,
        },
        props: {
            code: {
                required: false,
                type: String,
                default: '',
            },
            show: {
                required: false,
                type: Boolean,
                default: true,
            },
            readonly: {
                required: false,
                type: Boolean,
                default: false,
            },
            language: {
                required: false,
                type: String,
                default: 'php',
            },
        },
        data() {
            return {
                codeMirrorOptions: {
                    viewportMargin: Infinity,
                    theme: Theme.codeMirrorThemes[storage.get('theme')],
                    mode: this.language === 'php' ? 'application/x-httpd-php' : 'json',
                    indentUnit: 4,
                    tabSize: 4,
                    lineNumbers: true,
                    line: true,
                    readOnly: this.readonly,
                },
            };
        },
        watch: {
            'themeService.theme': function (newVal) {
                console.log('changed! ' + newVal);
            },
        },
        methods: {
            handleChange(code) {
                this.$emit('input', code);
            },
        },
    };
</script>
