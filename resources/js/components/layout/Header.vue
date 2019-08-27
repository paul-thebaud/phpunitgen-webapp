<template>
    <nav class="nav gradient">
        <div class="nav-container container">
            <RouterLink :to="{ name: 'home' }" class="nav-link-home">
                PhpUnitGen
            </RouterLink>

            <div class="nav-mobile-toggle">
                <Button
                        @click.stop="toggleNav"
                        variant="secondary"
                        rounded
                        large
                >
                    <FontAwesomeIcon :icon="menuIcon"></FontAwesomeIcon>
                </Button>
            </div>

            <HandleClickOutside :click-outside="closeNav">
                <div class="nav-wrapper" :class="[ displayNav ? 'nav-wrapper-visible' : 'nav-wrapper-hidden' ]">
                    <ul class="nav-wrapper-list">
                        <li>
                            <RouterLink :to="{ name: 'home' }" class="nav-link">
                                Documentation
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'home' }" class="nav-link">
                                Profile
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'home' }" class="nav-link">
                                Language
                            </RouterLink>
                        </li>
                    </ul>

                    <Button
                            :to="{ name: 'home' }"
                            class="nav-link-action"
                            variant="secondary"
                            rounded
                            large
                    >
                        Use Online
                    </Button>
                </div>
            </HandleClickOutside>
        </div>

        <Modal title="Language selection">
            <template slot="body">
                <div class="languages">
                    <p>
                        Choose your preferred language into the following list.
                    </p>
                    <div class="languages">
                        <Button class="m-2 font-bold" variant="secondary">
                            English
                        </Button>
                        <Button class="m-2 font-bold" variant="secondary">
                            Français
                        </Button>
                    </div>
                </div>
            </template>
        </Modal>
    </nav>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
    import Button from '@/components/Button';
    import HandleClickOutside from '@/components/HandleClickOutside';
    import Modal from '@/components/Modal';

    export default {
        name: 'Header',
        components: {
            Modal,
            FontAwesomeIcon,
            HandleClickOutside,
            Button,
        },
        data() {
            return {
                displayNav: false,
            };
        },
        computed: {
            menuIcon() {
                if (this.displayNav) {
                    return faTimes;
                }

                return faBars;
            },
            classObject() {
                if (this.displayNav) {
                    return [
                        'visible',
                        'opacity-100',
                    ];
                }

                return [
                    'h-0',
                    'invisible',
                    'opacity-0',
                ];
            },
        },
        methods: {
            toggleNav() {
                this.displayNav = ! this.displayNav;
            },
            closeNav() {
                this.displayNav = false;
            },
        },
    };
</script>

<style scoped>
    nav {
        @apply fixed w-full z-30 top-0 text-white shadow-lg;
    }

    .nav-container {
        @apply w-full flex flex-wrap items-center justify-between mx-auto py-2 px-4;
    }

    .nav-link-home {
        @apply font-bold text-2xl;
    }

    .nav-link {
        @apply inline-block font-bold py-2 px-4;
    }

    .nav-link-action {
        @apply inline-block mx-auto mt-4;
    }

    .nav-mobile-toggle {
        @apply justify-end;
    }

    .nav-wrapper {
        @apply w-full flex-grow text-right;
    }

    .nav-wrapper-visible {
        @apply mt-2 visible opacity-100;
    }

    .nav-wrapper-hidden {
        @apply mt-0 h-0 invisible opacity-0;
    }

    .nav-wrapper-list {
        @apply justify-end flex-1 items-center;
    }

    @screen lg {
        .nav-mobile-toggle {
            @apply hidden;
        }

        .nav-link {
            @apply mr-3;
        }

        .nav-link-action {
            @apply mx-0 mt-0;
        }

        .nav-wrapper {
            @apply flex items-center w-auto h-auto visible opacity-100 mt-0;
        }

        .nav-wrapper-list {
            @apply flex;
        }
    }
</style>
