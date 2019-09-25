<template>
    <div>
        <div class="my-3 d-flex">
            <BButton variant="primary">
                <FontAwesomeIcon :icon="icons.faCog"></FontAwesomeIcon>
                Configure
            </BButton>
            <BButton variant="secondary" class="ml-2">
                <FontAwesomeIcon :icon="icons.faFileImport"></FontAwesomeIcon>
                File import
            </BButton>
            <BButton variant="secondary" class="ml-2">
                <FontAwesomeIcon :icon="icons.faPaste"></FontAwesomeIcon>
                Paste
            </BButton>
            <BButton variant="primary"
                     class="ml-auto"
                     :disabled="code === '' || code === null"
                     @click="generate">
                <FontAwesomeIcon :icon="icons.faPlayCircle"></FontAwesomeIcon>
                Generate
            </BButton>
        </div>
        <BAlert variant="danger" :show="error !== null">{{ error }}</BAlert>
        <PrismEditor language="php" v-model="code" :line-numbers="true"/>
    </div>
</template>

<script>
    import 'prismjs';
    import 'prismjs/components/prism-markup-templating';
    import 'prismjs/components/prism-php';
    import 'vue-prism-editor/dist/VuePrismEditor.css';
    import PrismEditor from 'vue-prism-editor';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCog, faFileImport, faPaste, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

    export default {
        components: {
            FontAwesomeIcon,
            PrismEditor,
        },
        props: {
            error: {
                required: false,
                type: String,
            }
        },
        data() {
            return {
                code: null,
                icons: {
                    faCog,
                    faFileImport,
                    faPaste,
                    faPlayCircle,
                },
            };
        },
        methods: {
            generate() {
                this.$emit('generate', this.code);
            },
        },
    };
</script>

<style scoped>

</style>
