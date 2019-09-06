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
                    <b-nav-item class="mr-lg-2" :to="{ name: 'home' }">
                        Documentation
                    </b-nav-item>

                    <b-nav-item class="mr-lg-2" :to="{ name: 'home' }">
                        Profile
                    </b-nav-item>

                    <b-nav-item-dropdown text="Language" class="mr-lg-2" right>
                        <b-dropdown-item v-for="(translation, targetLanguage) in languages"
                                         @click="onLanguageChange(targetLanguage)"
                                         :key="targetLanguage"
                                         :active="language === targetLanguage"
                        >
                            {{ translation }}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="Theme" class="mr-lg-2" right>
                        <b-dropdown-item v-for="(translation, targetTheme) in themes"
                                         @click="onThemeChange(targetTheme)"
                                         :key="targetTheme"
                                         :active="theme === targetTheme"
                        >
                            {{ translation }}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-button class="rounded-full px-4 py-2" :to="{ name: 'home' }">
                        Use Online
                    </b-button>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

    export default {
        name: 'Header',
        components: {
            FontAwesomeIcon,
        },
        data() {
            return {
                closedMenuIcon: faBars,
                openedMenuIcon: faTimes,
                language: 'english',
                theme: 'light',
                languages: {
                    english: 'English',
                    french: 'Français',
                },
                themes: {
                    light: 'Light',
                    dark: 'Dark',
                },
            };
        },
        methods: {
            onLanguageChange(language) {
                if (language === this.language) {
                    return;
                }

                this.language = language;
            },
            onThemeChange(theme) {
                if (theme === this.theme) {
                    return;
                }

                const previousTheme = this.theme;
                const classList = document.body.classList;

                this.theme = theme;

                classList.add('theme-switching');
                classList.add(`theme-${this.theme}`);
                classList.remove(`theme-${previousTheme}`);

                setTimeout(() => {
                    classList.remove(`theme-switching`);
                }, 500);
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
