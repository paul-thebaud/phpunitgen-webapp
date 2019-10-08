<template>
    <PrismEditor v-if="show"
                 :code="code"
                 :line-numbers="true"
                 :readonly="readonly"
                 :language="language"
                 @change="handleChange"/>
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
        methods: {
            handleChange(code) {
                this.$emit('input', code);
            },
        },
    };
</script>
