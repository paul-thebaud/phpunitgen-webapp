<template>
    <BContainer class="my-5 tool-tabs">
        <div class="d-flex align-items-center">
            <RadialProgress start-color="var(--gradient-start-color)"
                            stop-color="var(--gradient-stop-color)"
                            inner-stroke-color="var(--secondary-bg-color)"
                            :diameter="100"
                            :completed-steps="generationsCount"
                            :total-steps="nextThemeUnlockAt || generationsCount">
                <span>
                    {{ nextThemeUnlock ? themeService.icon(nextThemeUnlock) : '🔥' }}
                </span>
                <strong>
                    {{ generationsCount }}{{ nextThemeUnlockAt ? ` / ${nextThemeUnlockAt}` : '' }}
                </strong>
            </RadialProgress>
            <p class="ml-2 mb-0">
                {{ nextThemeUnlock ? $t('tool.unlock_themes') : $t('tool.all_themes_unlocked') }}
            </p>
        </div>
        <BTabs v-model="tabIndex"
               align="center"
               class="my-3"
               fill>
            <BTab>
                <template v-slot:title>
                    <FontAwesomeIcon :icon="icons.faTerminal" class="mr-2"></FontAwesomeIcon>
                    {{ $t('tool.editor.title') }}
                </template>
                <EditorTab @generate="handleGenerate"
                           :generating="generating"
                           :exception-message="exceptionMessage"
                           :exception="exception"/>
            </BTab>
            <BTab>
                <template v-slot:title>
                    <FontAwesomeIcon :icon="icons.faPlay" class="mr-2"></FontAwesomeIcon>
                    {{ $t('tool.generated.title') }}
                </template>
                <GeneratedTab :name="generatedName"
                              :code="generatedCode"
                              :executionTime="executionTime"/>
            </BTab>
        </BTabs>
    </BContainer>
</template>

<script>
    import RadialProgress from 'vue-radial-progress';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faPlay, faTerminal } from '@fortawesome/free-solid-svg-icons';
    import { storage, theme } from '@/services';
    import { testResource } from '@/resources';
    import Theme from '@/services/Theme';
    import EditorTab from '@/components/tool/EditorTab';
    import GeneratedTab from '@/components/tool/GeneratedTab';
    import Versions from '@/components/tool/Versions';
    import UnknownError from '@/errors/UnknownError';

    export default {
        components: {
            RadialProgress,
            FontAwesomeIcon,
            EditorTab,
            GeneratedTab,
            Versions,
        },
        data() {
            return {
                icons: {
                    faPlay,
                    faTerminal,
                },
                themeService: theme,
                generating: false,
                exceptionMessage: null,
                exception: null,
                generatedName: null,
                generatedCode: null,
                executionTime: null,
                tabIndex: 0,
                generationsCount: storage.get('generationsCount'),
                nextThemeUnlock: theme.nextThemeUnlock(),
                nextThemeUnlockAt: theme.nextThemeUnlockAt(),
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

                    this.nextThemeUnlock = theme.nextThemeUnlock();
                    this.nextThemeUnlockAt = theme.nextThemeUnlockAt();
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
