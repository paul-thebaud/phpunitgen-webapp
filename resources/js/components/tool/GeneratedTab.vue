<template>
    <div>
        <div class="my-3 d-flex justify-content-end">
            <div class="mr-auto d-flex">
                <ConfigurationButton/>
                <p v-if="hasGenerated" class="ml-2 my-auto">
                    {{ $t('tool.generated.execution_time', { executionTime: formattedExecutionTime }) }}
                </p>
            </div>
            <BButton variant="secondary"
                     class="mr-2"
                     :disabled="! hasGenerated"
                     @click="handleCopy">
                <FontAwesomeIcon :icon="icons.faCopy"></FontAwesomeIcon>
                {{ copyButtonLabel }}
            </BButton>
            <BButton variant="secondary"
                     :disabled="! hasGenerated"
                     @click="handleDownload">
                <FontAwesomeIcon :icon="icons.faDownload"></FontAwesomeIcon>
                {{ $t('tool.generated.actions.download') }}
            </BButton>
        </div>
        <BAlert :show="! hasGenerated" variant="warning">
            {{ $t('tool.generated.missing') }}
        </BAlert>
        <Editor :show="hasGenerated"
                :code="code"
                :readonly="true"/>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';
    import Editor from '@/components/tool/Editor';
    import ConfigurationButton from '@/components/tool/ConfigurationButton';

    export default {
        components: {
            Editor,
            ConfigurationButton,
            FontAwesomeIcon,
        },
        props: {
            name: {
                required: false,
                type: String,
            },
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
                copyButtonLabel: this.$t('tool.generated.actions.copy'),
                icons: {
                    faCopy,
                    faDownload,
                },
            };
        },
        computed: {
            formattedExecutionTime() {
                return Math.round(this.executionTime * 1000);
            },
            hasGenerated() {
                return this.code !== null && this.executionTime !== null;
            },
        },
        methods: {
            handleCopy() {
                this.$copyText(this.code)
                    .then(() => {
                        this.copyButtonLabel = this.$t('tool.generated.actions.copied');
                    }, () => {
                        this.copyButtonLabel = this.$t('tool.generated.actions.copy_error');
                    });
            },
            handleDownload() {
                const anchorElement = document.createElement('a');
                anchorElement.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(this.code)}`);
                anchorElement.setAttribute('download', `${this.name}.php`);
                anchorElement.style.display = 'none';

                document.body.appendChild(anchorElement);
                anchorElement.click();
                document.body.removeChild(anchorElement);
            },
        },
    };
</script>
