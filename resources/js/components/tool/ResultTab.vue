<template>
    <div>
        <div class="my-3 d-flex justify-content-end">
            <p v-if="hasGenerated" class="my-auto mr-auto">
                Generated in {{ Math.round(executionTime * 1000) }} ms!
            </p>
            <BButton variant="secondary" class="mr-2" :disabled="! hasGenerated">
                <FontAwesomeIcon :icon="icons.faCopy"></FontAwesomeIcon>
                Copy
            </BButton>
            <BButton variant="secondary" :disabled="! hasGenerated">
                <FontAwesomeIcon :icon="icons.faDownload"></FontAwesomeIcon>
                Download file
            </BButton>
        </div>
        <PrismEditor v-if="hasGenerated" language="php" v-model="code" :line-numbers="true"/>
        <BAlert :show="! hasGenerated" variant="warning">
            No tests generated for the the moment. Use the editor to write the code you wan't generate tests for.
        </BAlert>
    </div>
</template>

<script>
    import 'prismjs';
    import 'prismjs/components/prism-markup-templating';
    import 'prismjs/components/prism-php';
    import 'vue-prism-editor/dist/VuePrismEditor.css';
    import PrismEditor from 'vue-prism-editor';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';

    export default {
        components: {
            FontAwesomeIcon,
            PrismEditor,
        },
        props: {
            code: {
                required: false,
                type: String,
            },
            executionTime: {
                required: false,
                type: Number,
            },
        },
        data() {
            return {
                icons: {
                    faCopy,
                    faDownload,
                },
            };
        },
        computed: {
            hasGenerated() {
                return this.code !== null && this.executionTime !== null;
            },
        },
    };
</script>

<style scoped>

</style>
