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
                    const response = await fetch('/api/tests', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            config: this.config,
                            code: code,
                        }),
                    });

                    const payload = await response.json();
                    if (response.status !== 201) {
                        throw new Error(payload.exception);
                    }

                    this.error = null;
                    this.generated = payload['code'];
                    this.executionTime = payload['execution_time'];
                    this.tabIndex = 1;
                } catch (error) {
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
