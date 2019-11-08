<template>
    <BNavbar toggleable="lg"
             fixed="top"
             class="shadow"
             type="">
        <BContainer>
            <BNavbarBrand :to="{ name: 'home' }">
                <strong>PhpUnitGen</strong>
            </BNavbarBrand>

            <BButton class="d-lg-none rounded-full"
                     v-b-toggle.nav-collapse>
                <FontAwesomeIcon class="when-closed" icon="bars"></FontAwesomeIcon>
                <FontAwesomeIcon class="when-opened" icon="times"></FontAwesomeIcon>
            </BButton>

            <BCollapse id="nav-collapse"
                       is-nav>
                <BNavbarNav class="ml-auto">
                    <BNavItem class="mr-lg-2"
                              href="/docs#/">
                        {{ $t("layout.header.documentation") }}
                    </BNavItem>

                    <BNavItemDropdown class="mr-lg-2"
                                      :text="$t('layout.header.language')"
                                      right>
                        <BDropdownItem v-for="(translation, targetLocale) in locales"
                                       @click="handleLocaleChange(targetLocale)"
                                       :key="`lang-${targetLocale}`"
                                       :active="currentLocale === targetLocale">
                            {{ translation }}
                        </BDropdownItem>
                    </BNavItemDropdown>

                    <BNavItemDropdown class="mr-lg-2"
                                      :text="$t('layout.header.theme')"
                                      right>
                        <BDropdownItem v-for="targetTheme in themes"
                                       @click="handleThemeChange(targetTheme)"
                                       :key="`theme-${targetTheme.getKey()}`"
                                       :active="currentTheme.getKey() === targetTheme.getKey()">
                            {{ targetTheme.getEmoji() }}
                            {{ $t(`common.themes.${targetTheme.getKey()}`) }}
                        </BDropdownItem>
                    </BNavItemDropdown>

                    <BButton :to="{ name: 'tool' }"
                             class="mt-2 mt-lg-0 rounded-pill px-4 py-2">
                        {{ $t("layout.header.useOnline") }}
                    </BButton>
                </BNavbarNav>
            </BCollapse>
        </BContainer>
    </BNavbar>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Inject, Prop } from "vue-property-decorator";
    import { TYPES } from "@/container/types";
    import { ThemeI } from "@/container/contracts/themeI";
    import { LocaleI } from "@/container/contracts/localeI";
    import { Theme } from "@/container/concerns/theme";

    @Component
    export default class HeaderNav extends Vue {
        @Inject(TYPES.Theme)
        protected theme!: ThemeI;

        @Inject(TYPES.Locale)
        protected locale!: LocaleI;

        @Prop(Array)
        protected readonly themes!: Theme[];

        protected locales = this.locale.getLocales();

        protected currentTheme = this.theme.getTheme();

        protected currentLocale = this.locale.getLocale();

        protected handleThemeChange(newTheme: Theme): void {
            this.currentTheme = newTheme;
            this.theme.changeTheme(this.currentTheme);
        }

        protected handleLocaleChange(newLocale: string): void {
            this.locale.changeLocale(this.currentLocale = newLocale);
        }
    };
</script>
