<template>
    <BContainer class="my-5 tool-tabs">
        <BTabs align="center"
               v-model="tabIndex"
               fill>
            <BTab :title="$t('tool.editor.title')">
                <EditorTab @generate="generate"
                           :exception-message="exceptionMessage"
                           :exception="exception"/>
            </BTab>
            <BTab :title="$t('tool.generated.title')">
                <GeneratedTab :code="generated"
                              :executionTime="executionTime"/>
            </BTab>
        </BTabs>
    </BContainer>
</template>

<script>
    import { testResource } from '@/resources';
    import EditorTab from '@/components/tool/EditorTab';
    import GeneratedTab from '@/components/tool/GeneratedTab';
    import UnknownError from '@/errors/UnknownError';

    export default {
        components: {
            EditorTab,
            GeneratedTab,
        },
        data() {
            return {
                exceptionMessage: null,
                exception: null,
                generated: null,
                executionTime: null,
                tabIndex: 0,
            };
        },
        methods: {
            async generate(code) {
                try {
                    const test = await testResource.create(code);

                    this.exceptionMessage = null;
                    this.exception = null;

                    this.generated = test.code;
                    this.executionTime = test.execution_time;

                    this.tabIndex = 1;
                } catch (error) {
                    if (error.name === UnknownError.name) {
                        this.exception = error.exception;
                    } else {
                        this.exception = null;
                    }

                    this.exceptionMessage = this.$t('tool.editor.exception');
                }
            },
        },
    };
</script>
