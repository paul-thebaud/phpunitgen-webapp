<template>
    <BContainer class="my-5">
        <h1>{{ $t('themes.title') }}</h1>
        <p>{{ $t('themes.description') }}</p>
        <BRow>
            <BCol v-for="(unlockAt, targetTheme) in themes"
                  :key="targetTheme"
                  class="theme-wrapper pb-4"
                  sm="6"
                  md="4"
                  lg="3">
                <BCard class="text-center"
                       :class="themeCardClass(targetTheme, unlockAt)"
                       @click="onThemeChange(targetTheme, unlockAt)">
                    <h4 class="mb-0">
                        {{ themeService.icon(targetTheme) }}
                        {{ $t(`themes.${targetTheme}`) }}
                    </h4>
                    <small>
                        {{ themeCardText(unlockAt) }}
                    </small>
                </BCard>
            </BCol>
        </BRow>
    </BContainer>
</template>

<script>
    import { storage, theme } from '@/services';

    export default {
        data() {
            return {
                themeService: theme,
                themes: theme.constructor.themes,
                theme: storage.get('theme'),
                generationsCount: storage.get('generationsCount'),
            };
        },
        methods: {
            themeCardClass(theme, unlockAt) {
                return unlockAt > this.generationsCount
                    ? 'theme-locked'
                    : (theme === this.theme ? 'active' : '');
            },
            themeCardText(unlockAt) {
                return unlockAt > this.generationsCount
                    ? `${this.generationsCount} / ${unlockAt}`
                    : this.$t('themes.theme_unlocked');
            },
            onThemeChange(newTheme, unlockAt) {
                if (newTheme === this.theme || unlockAt > this.generationsCount) {
                    return;
                }

                theme.changeTheme(this.theme = newTheme);
            },
        }
    };
</script>

<style lang="scss" scoped>
    .theme-wrapper .card {
        cursor: pointer;
        border: 1px solid var(--secondary-bg-color);

        &.active {
            border: 1px solid var(--primary-bg-color);
        }
        &.theme-locked {
            background-color: grey;
            border: grey;
            color: white;
            cursor: not-allowed;
            filter: grayscale(100%);
        }
    }
</style>
