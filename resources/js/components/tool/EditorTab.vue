<template>
    <div>
        <div class="my-3 d-flex">
            <input ref="file"
                   type="file"
                   accept=".php"
                   class="d-none"
                   @change="handleFileChanged"/>
            <BButton variant="primary" :disabled="generating">
                <FontAwesomeIcon :icon="icons.faCog"></FontAwesomeIcon>
                {{ $t('tool.editor.actions.configure') }}
            </BButton>
            <BButton variant="secondary"
                     class="ml-2"
                     :disabled="generating"
                     @click="handleFileBrowser">
                <FontAwesomeIcon :icon="icons.faFileImport"></FontAwesomeIcon>
                {{ $t('tool.editor.actions.import') }}
            </BButton>
            <BButton variant="primary"
                     class="ml-auto"
                     :disabled="code === '' || code === null || generating"
                     @click="generate">
                <FontAwesomeIcon :icon="icons.faPlayCircle"></FontAwesomeIcon>
                {{ $t('tool.editor.actions.generate') }}
            </BButton>
        </div>
        <div v-if="exceptionMessage !== null && ! generating">
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
                :readonly="generating"
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
            generating: {
                required: true,
                type: Boolean,
            },
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
            handleFileBrowser() {
                this.$refs.file.click();
            },
            handleFileChanged(event) {
                const file = event.target.files[0];

                if (! file) {
                    return;
                }

                const fileReader = new FileReader();
                fileReader.onload = () => {
                    this.code = fileReader.result;
                };
                fileReader.readAsText(file);
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
