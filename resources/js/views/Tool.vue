<template>
    <BContainer class="my-5 tool-tabs">
        <p v-if="generationsCount < maxGenerationsCountUnlock"
           v-html="$t('tool.themes_unlocking', { count: generationsCount })"></p>
        <p v-else
           v-html="$t('tool.themes_unlocked', { count: generationsCount })"></p>
        <BTabs align="center"
               v-model="tabIndex"
               fill>
            <BTab :title="$t('tool.editor.title')">
                <EditorTab @generate="handleGenerate"
                           :generating="generating"
                           :exception-message="exceptionMessage"
                           :exception="exception"/>
            </BTab>
            <BTab :title="$t('tool.generated.title')">
                <GeneratedTab :name="generatedName"
                              :code="generatedCode"
                              :executionTime="executionTime"/>
            </BTab>
        </BTabs>
        <Versions/>
    </BContainer>
</template>

<script>
    import { storage } from '@/services';
    import { testResource } from '@/resources';
    import Theme from '@/services/Theme';
    import EditorTab from '@/components/tool/EditorTab';
    import GeneratedTab from '@/components/tool/GeneratedTab';
    import Versions from '@/components/tool/Versions';
    import UnknownError from '@/errors/UnknownError';

    export default {
        components: {
            EditorTab,
            GeneratedTab,
            Versions,
        },
        data() {
            return {
                generating: false,
                exceptionMessage: null,
                exception: null,
                generatedName: null,
                generatedCode: null,
                executionTime: null,
                tabIndex: 0,
                maxGenerationsCountUnlock: Math.max(...Object.values(Theme.themes)),
                generationsCount: storage.get('generationsCount'),
            };
        },
        methods: {
            async handleGenerate(code) {
                this.generating = true;

                try {
                    const test = await testResource.create(code);

                    this.exceptionMessage = null;
                    this.exception = null;

                    this.generatedName = test.name;
                    this.generatedCode = test.code;
                    this.executionTime = test.execution_time;

                    this.tabIndex = 1;

                    this.generationsCount++;
                    storage.set('generationsCount', this.generationsCount);

                    for (const theme in Theme.themes) {
                        if (Theme.themes[theme] === this.generationsCount) {
                            this.$emit('theme-unlock', theme);
                        }
                    }
                } catch (error) {
                    if (error.name === UnknownError.name) {
                        this.exception = error.exception;
                    } else {
                        this.exception = null;
                    }

                    this.exceptionMessage = this.$t('tool.editor.exception');
                }

                this.generating = false;
            },
        },
    };
</script>
