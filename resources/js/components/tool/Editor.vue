<template>
    <PrismEditor v-if="show"
                 @change="handleChange"
                 :code="code"
                 :line-numbers="true"
                 :readonly="readonly"
                 :language="language"/>
</template>

<script>
    import '@sass/components/tool/editor.scss';
    import 'prismjs';
    import 'prismjs/components/prism-markup-templating';
    import 'prismjs/components/prism-php';
    import 'prismjs/components/prism-json';
    import PrismEditor from 'vue-prism-editor';

    export default {
        components: {
            PrismEditor,
        },
        props: {
            code: {
                required: false,
                type: String,
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
            }
        },
        mounted() {

        },
        methods: {
            handleChange(code) {
                this.$emit('change', code);
            },
        },
    };
</script>
