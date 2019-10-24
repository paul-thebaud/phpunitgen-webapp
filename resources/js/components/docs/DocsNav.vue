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
                    <li v-for="targetTheme in themes"
                        @click.prevent="onThemeChange(targetTheme)"
                        :key="`lang-${targetTheme}`">
                        <a href="#"
                           :class="theme === targetTheme ? 'active' : ''">
                            {{ themeService.icon(targetTheme) }}
                            {{ $t(`themes.${targetTheme}`) }}
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
    import { storage, locale, theme, docs } from '@/services';

    export default {
        data() {
            return {
                themeService: theme,
                locale: storage.get('locale'),
                locales: locale.constructor.availableLocales,
                theme: storage.get('theme'),
                themes: theme.unlockedThemes(),
            };
        },
        methods: {
            onLocaleChange(newLocale) {
                if (newLocale === this.locale) {
                    return;
                }

                locale.changeLocale(this.locale = newLocale);

                const path = window.location.href.replace(/^.*\/docs#\/?([a-z]{2}\/)?/, '');

                window.location.hash = docs.getDocumentationPath(path, newLocale)
                    .replace(/^\/docs#/, '');
            },
            onThemeChange(newTheme) {
                if (newTheme === this.theme) {
                    return;
                }

                theme.changeTheme(this.theme = newTheme);
            },
        },
    };
</script>
