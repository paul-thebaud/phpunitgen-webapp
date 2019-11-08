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
    import Header from '@/components/layout/HeaderNav';
    import Footer from '@/components/layout/FooterNav';

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
                        title: `${theme.icon(newTheme)} ${this.$i18n.t('themes.unlocked.title')}`,
                        autoHideDelay: 5000,
                    },
                );
            },
        },
    };
</script>
