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
                <FontAwesomeIcon class="when-closed" :icon="icons.faBars"></FontAwesomeIcon>
                <FontAwesomeIcon class="when-opened" :icon="icons.faTimes"></FontAwesomeIcon>
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
                                       :active="locale === targetLocale">
                            {{ translation }}
                        </BDropdownItem>
                    </BNavItemDropdown>

                    <BNavItemDropdown class="mr-lg-2"
                                      :text="$t('layout.header.theme')"
                                      right>
                        <BDropdownItem v-for="targetTheme in themes"
                                       @click="handleThemeChange(targetTheme)"
                                       :key="`theme-${targetTheme.getKey()}`"
                                       :active="theme === targetTheme">
                            {{ targetTheme.getEmoji() }}
                            {{ $t(`common.themes.${targetTheme.getKey()}`) }}
                        </BDropdownItem>
                    </BNavItemDropdown>

                    <BButton class="rounded-pill px-4 py-2"
                             :to="{ name: 'tool' }">
                        {{ $t("layout.header.useOnline") }}
                    </BButton>
                </BNavbarNav>
            </BCollapse>
        </BContainer>
    </BNavbar>
</template>

<script lang="ts">
    import "@sass/components/layout/header.scss";
    import Vue from "vue";
    import Component from "vue-class-component";
    import { Prop } from "vue-property-decorator";
    import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
    import { TYPES } from "@/container/types";
    import { ThemeI } from "@/container/contracts/themeI";
    import { LocaleI } from "@/container/contracts/localeI";
    import { container } from "@/container/container";
    import { Theme } from "@/container/concerns/theme";

    const theme: ThemeI = container.get<ThemeI>(TYPES.Theme);
    const locale: LocaleI = container.get<LocaleI>(TYPES.Locale);

    @Component
    export default class App extends Vue {
        @Prop(Array)
        protected readonly themes!: Theme[];

        protected icons = {
            faBars,
            faTimes,
        };

        protected locales: { [key: string]: string } = locale.getLocales();

        protected theme: Theme = theme.getTheme();

        protected locale: string = locale.getLocale();

        protected handleLocaleChange(newLocale: string): void {
            locale.changeLocale(this.locale = newLocale);
        }

        protected handleThemeChange(newTheme: Theme): void {
            theme.changeTheme(this.theme = newTheme);
        }
    };
</script>

<style scoped>

</style>
