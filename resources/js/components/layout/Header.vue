<template>
    <b-navbar toggleable="lg" fixed="top" type="" class="shadow bg-gradient">
        <b-container>
            <b-navbar-brand :to="{ name: 'home' }">
                <strong>PhpUnitGen</strong>
            </b-navbar-brand>

            <b-button class="d-lg-none rounded-full" v-b-toggle.nav-collapse>
                <FontAwesomeIcon class="when-closed" :icon="closedMenuIcon"></FontAwesomeIcon>
                <FontAwesomeIcon class="when-opened" :icon="openedMenuIcon"></FontAwesomeIcon>
            </b-button>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item class="mr-lg-2" href="/docs#/">
                        {{ $t('header.links.documentation') }}
                    </b-nav-item>

                    <b-nav-item-dropdown :text="$t('header.links.language')" class="mr-lg-2" right>
                        <b-dropdown-item v-for="(translation, targetLocale) in locales"
                                         @click="onLocaleChange(targetLocale)"
                                         :key="`lang-${targetLocale}`"
                                         :active="locale === targetLocale"
                        >
                            {{ translation }}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown :text="$t('header.links.theme')" class="mr-lg-2" right>
                        <b-dropdown-item v-for="(translation, targetTheme) in themes"
                                         @click="onThemeChange(targetTheme)"
                                         :key="`theme-${targetTheme}`"
                                         :active="theme === targetTheme"
                        >
                            {{ translation }}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-button class="rounded-full px-4 py-2" :to="{ name: 'home' }">
                        {{ $t('header.links.online') }}
                    </b-button>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
    import Locale from '@/services/Locale';
    import Theme from '@/services/Theme';

    export default {
        name: 'Header',
        components: {
            FontAwesomeIcon,
        },
        data() {
            return {
                closedMenuIcon: faBars,
                openedMenuIcon: faTimes,
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

<style lang="scss">
    .navbar {
        .navbar-brand, .nav-link {
            color: var(--gradient-color) !important;
        }

        .collapsed > .when-opened,
        :not(.collapsed) > .when-closed {
            display: none;
        }
    }
</style>
