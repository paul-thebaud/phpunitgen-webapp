<template>
    <nav class="app-nav no-badge">
        <ul>
            <li>
                {{ $t('header.links.language') }}
                <ul>
                    <li v-for="(translation, targetLocale) in locales"
                        @click.prevent="onLocaleChange(targetLocale)"
                        :key="`lang-${targetLocale}`">
                        <a href="#"
                           :class="locale === targetLocale ? 'active' : ''">
                            {{ translation }}
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                {{ $t('header.links.theme') }}
                <ul>
                    <li v-for="(translation, targetTheme) in themes"
                        @click.prevent="onThemeChange(targetTheme)"
                        :key="`lang-${targetTheme}`">
                        <a href="#"
                           :class="theme === targetTheme ? 'active' : ''">
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
    import '@sass/components/docs/docs-nav.scss';
    import { configManager, localeManager, themeManager } from '@/services';

    export default {
        data() {
            return {
                locale: configManager.get('locale'),
                locales: localeManager.availableLocales,
                theme: configManager.get('theme'),
                themes: themeManager.availableThemes.reduce((themes, theme) => {
                    themes[theme] = this.$t(`themes.${theme}`);

                    return themes;
                }, {}),
            };
        },
        methods: {
            onLocaleChange(locale) {
                if (locale === this.locale) {
                    return;
                }

                localeManager.changeLocale(this.locale = locale);

                const path = window.location.href.replace(/^.*\/docs#\/?([a-z]{2}\/)?/, '');

                window.location.hash = localeManager
                    .getDocumentationPath(path, locale)
                    .replace(/^\/docs#/, '');
            },
            onThemeChange(theme) {
                if (theme === this.theme) {
                    return;
                }

                themeManager.changeTheme(this.theme = theme);
            },
        },
    };
</script>
