<template>
    <div>
        <div class="my-3 d-flex">
            <BButton variant="primary">
                <FontAwesomeIcon :icon="icons.faCog"></FontAwesomeIcon>
                {{ $t('tool.editor.actions.configure') }}
            </BButton>
            <BButton variant="secondary" class="ml-2">
                <FontAwesomeIcon :icon="icons.faFileImport"></FontAwesomeIcon>
                {{ $t('tool.editor.actions.import') }}
            </BButton>
            <BButton variant="secondary" class="ml-2">
                <FontAwesomeIcon :icon="icons.faPaste"></FontAwesomeIcon>
                {{ $t('tool.editor.actions.paste') }}
            </BButton>
            <BButton variant="primary"
                     class="ml-auto"
                     :disabled="code === '' || code === null"
                     @click="generate">
                <FontAwesomeIcon :icon="icons.faPlayCircle"></FontAwesomeIcon>
                {{ $t('tool.editor.actions.generate') }}
            </BButton>
        </div>
        <div v-if="exceptionMessage !== null">
            <div class="d-flex mb-3">
                <BAlert class="flex-grow-1 mr-2 mb-0" variant="danger" :show="true">
                    {{ exceptionMessage }}
                </BAlert>
                <BButton v-if="exception !== null"
                         class="align-self-center"
                         variant="danger"
                         @click="toggleShowExceptionDump">
                    {{ exceptionDumpButtonLabel }}
                </BButton>
            </div>
            <Editor v-if="showExceptionDumpEditor"
                    language="json"
                    :code="JSON.stringify(exception, null, 2)"
                    :readonly="true"/>
        </div>
        <Editor v-if="! showExceptionDumpEditor"
                :code="code"
                @change="handleEditorChange"/>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCog, faFileImport, faPaste, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
    import Editor from '@/components/tool/Editor';

    export default {
        components: {
            Editor,
            FontAwesomeIcon,
        },
        props: {
            exceptionMessage: {
                required: false,
                type: String,
            },
            exception: {
                required: false,
                type: Object,
            },
        },
        data() {
            return {
                code: '<\?php class H {',
                showExceptionDump: false,
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
            handleEditorChange(code) {
                this.code = code;
            },
            toggleShowExceptionDump() {
                this.showExceptionDump = ! this.showExceptionDump;
            },
        },
        computed: {
            showExceptionDumpEditor() {
                return this.exception !== null && this.showExceptionDump === true;
            },
            exceptionDumpButtonLabel() {
                if (this.showExceptionDumpEditor) {
                    return this.$t('tool.editor.hide_exception_dump');
                }

                return this.$t('tool.editor.show_exception_dump');
            },
        },
    };
</script>
