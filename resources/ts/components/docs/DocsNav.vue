<template>
    <nav class="app-nav no-badge">
        <ul>
            <li>
                {{ $t("layout.header.language") }}
                <ul>
                    <li v-for="(translation, targetLocale) in locales"
                        @click.prevent="handleLocaleChange(targetLocale)"
                        :key="`lang-${targetLocale}`">
                        <a href="#"
                           :class="currentLocale === targetLocale ? 'active' : ''">
                            {{ translation }}
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                {{ $t("layout.header.theme") }}
                <ul>
                    <li v-for="targetTheme in themes"
                        @click.prevent="handleThemeChange(targetTheme)"
                        :key="`theme-${targetTheme.getKey()}`">
                        <a href="#"
                           :class="currentTheme === targetTheme ? 'active' : ''">
                            {{ targetTheme.getEmoji() }}
                            {{ $t(`common.themes.${targetTheme.getKey()}`) }}
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="/">
                    <b>{{ $t("layout.header.backToApp") }}</b>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
    import Vue from "vue";
    import { TYPES } from "@/container/types";
    import { Component, Inject } from "vue-property-decorator";
    import { ThemeI } from "@/container/contracts/themeI";
    import { LocaleI } from "@/container/contracts/localeI";
    import { Theme } from "@/container/concerns/theme";

    @Component
    export default class DocsNav extends Vue {
        @Inject(TYPES.Theme)
        protected theme!: ThemeI;

        @Inject(TYPES.Locale)
        protected locale!: LocaleI;

        protected themes = this.theme.getUnlockedThemes();

        protected locales = this.locale.getLocales();

        protected currentTheme = this.theme.currentTheme;

        protected currentLocale = this.locale.currentLocale;

        protected handleThemeChange(newTheme: Theme): void {
            this.theme.currentTheme = this.currentTheme = newTheme;
        }

        protected handleLocaleChange(newLocale: string): void {
            const previousLocale = this.currentLocale;

            this.locale.currentLocale = this.currentLocale = newLocale;

            if (newLocale !== previousLocale) {
                window.location.hash = window.location.hash.replace(/^#\/[a-z]{2}/, `#${newLocale}`);
            }
        }
    }
</script>
