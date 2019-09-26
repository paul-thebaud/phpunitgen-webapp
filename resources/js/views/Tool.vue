<template>
    <BContainer class="my-5 tool-tabs">
        <BTabs v-model="tabIndex" align="center" fill>
            <BTab title="Editor">
                <EditorTab :error="error" @generate="generate"></EditorTab>
            </BTab>
            <BTab title="Generated">
                <ResultTab :code="generated" :executionTime="executionTime"></ResultTab>
            </BTab>
        </BTabs>
    </BContainer>
</template>

<script>
    import { testResource } from '@/resources';
    import EditorTab from '@/components/tool/EditorTab';
    import ResultTab from '@/components/tool/ResultTab';

    export default {
        components: {
            EditorTab,
            ResultTab,
        },
        data() {
            return {
                config: {
                    test_generator: 'delegate',
                    mock_generator: 'mockery',
                },
                error: null,
                generated: null,
                executionTime: null,
                tabIndex: 0,
            };
        },
        methods: {
            async generate(code) {
                try {
                    const test = await testResource.create(code);

                    this.error = null;
                    this.generated = test.code;
                    this.executionTime = test.execution_time;
                    this.tabIndex = 1;
                } catch (error) {
                    console.error(error.message);
                    console.error(error);
                    this.error = error.message;
                }
            },
        },
    };
</script>

<style lang="scss">
    .tool-tabs {
        .nav.nav-tabs {
            border: none;

            .nav-link {
                background: none;
                color: var(--base-color);
                border: none;
                border-bottom: 1px solid var(--secondary-bg-color);
                transition: 300ms;

                &.active {
                    border-bottom: 1px solid var(--primary-bg-color);
                }

                &:not(.active):hover {
                    color: var(--primary-bg-color);
                    border-bottom: 1px solid var(--primary-bg-color);
                }
            }
        }
    }
</style>
