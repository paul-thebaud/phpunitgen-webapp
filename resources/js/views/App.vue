<template>
    <div id="app">
        <Header :themes="themes"/>
        <div class="wrapper">
            <RouterView @theme-unlock="handleThemeUnlock"/>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import { theme } from '@/services';
    import Header from '@/components/layout/Header';
    import Footer from '@/components/layout/Footer';

    export default {
        components: {
            Header,
            Footer,
        },
        data() {
            return {
                themes: theme.unlockedThemes(),
            };
        },
        methods: {
            handleThemeUnlock(newTheme) {
                this.themes = theme.unlockedThemes();

                this.$bvToast.toast(
                    this.$i18n.t('themes.unlocked.description', { theme: this.$i18n.t(`themes.${newTheme}`) }),
                    {
                        title: this.$i18n.t('themes.unlocked.title'),
                        autoHideDelay: 5000,
                    },
                );
            },
        },
    };
</script>
