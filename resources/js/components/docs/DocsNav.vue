<template>
    <nav class="app-nav no-badge">
        <ul>
            <li>
                {{ $t('header.links.theme') }}
                <ul>
                    <li v-for="(translation, targetTheme) in themes"
                        @click.prevent="onThemeChange(targetTheme)"
                        :key="`lang-${targetTheme}`"
                        :class="theme === targetTheme ? 'active' : ''"
                    >
                        <a href="#">
                            {{ translation }}
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                {{ $t('header.links.language') }}
                <ul>
                    <li v-for="(translation, targetLocale) in locales"
                        @click="onLocaleChange(targetLocale)"
                        :key="`lang-${targetLocale}`"
                        :class="locale === targetLocale ? 'active' : ''"
                    >
                        <a :href="targetLocale === 'en' ? '#/' : `#/${targetLocale}/`">
                            {{ translation }}
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="/">
                    <b>{{ $t('header.links.back') }}</b>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    import Locale from '@/services/Locale';
    import Theme from '@/services/Theme';

    export default {
        name: 'DocsNav',
        data() {
            return {
                locale: Locale.getLocale(),
                locales: Locale.availableLocales(),
                theme: Theme.getTheme(),
                themes: Theme.availableThemes(),
            };
        },
        methods: {
            onLocaleChange(locale) {
                if (locale === this.locale) {
                    return;
                }

                Locale.setLocale(this.locale = locale);
            },
            onThemeChange(theme) {
                if (theme === this.theme) {
                    return;
                }

                Theme.setTheme(this.theme = theme);
            },
        },
    };
</script>

<style scoped>

</style>
