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
                <FontAwesomeIcon class="when-closed" :icon="closedMenuIcon"></FontAwesomeIcon>
                <FontAwesomeIcon class="when-opened" :icon="openedMenuIcon"></FontAwesomeIcon>
            </BButton>

            <BCollapse id="nav-collapse"
                       is-nav>
                <BNavbarNav class="ml-auto">
                    <BNavItem class="mr-lg-2"
                              href="/docs#/">
                        {{ $t('header.links.documentation') }}
                    </BNavItem>

                    <BNavItemDropdown class="mr-lg-2"
                                      :text="$t('header.links.language')"
                                      right>
                        <BDropdownItem v-for="(translation, targetLocale) in locales"
                                       @click="onLocaleChange(targetLocale)"
                                       :key="`lang-${targetLocale}`"
                                       :active="locale === targetLocale">
                            {{ translation }}
                        </BDropdownItem>
                    </BNavItemDropdown>

                    <BNavItemDropdown class="mr-lg-2"
                                      :text="$t('header.links.theme')"
                                      right>
                        <BDropdownItem v-for="(translation, targetTheme) in themes"
                                       @click="onThemeChange(targetTheme)"
                                       :key="`theme-${targetTheme}`"
                                       :active="theme === targetTheme"
                        >
                            {{ translation }}
                        </BDropdownItem>
                    </BNavItemDropdown>

                    <BButton class="rounded-full px-4 py-2"
                             :to="{ name: 'tool' }">
                        {{ $t('header.links.online') }}
                    </BButton>
                </BNavbarNav>
            </BCollapse>
        </BContainer>
    </BNavbar>
</template>

<script>
    import '@sass/components/layout/header.scss';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
    import { configManager, localeManager, themeManager } from '@/services';

    export default {
        components: {
            FontAwesomeIcon,
        },
        data() {
            return {
                closedMenuIcon: faBars,
                openedMenuIcon: faTimes,
                locale: configManager.get('locale'),
                locales: localeManager.availableLocales,
                theme: configManager.get('theme'),
                themes: themeManager.availableThemes,
            };
        },
        methods: {
            onLocaleChange(locale) {
                if (locale === this.locale) {
                    return;
                }

                localeManager.changeLocale(this.locale = locale);
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
