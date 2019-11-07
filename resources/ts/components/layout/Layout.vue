<template>
    <div id="app">
        <Header :themes="unlockedThemes"/>
        <div class="wrapper">
            <RouterView @theme-unlock="handleThemeUnlock"/>
        </div>
        <Footer/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Header from "@/components/layout/Header.vue";
    import Footer from "@/components/layout/Footer.vue";
    import { TYPES } from "@/container/types";
    import { ThemeI } from "@/container/contracts/themeI";
    import { Theme } from "@/container/concerns/theme";
    import { Component, Inject } from "vue-property-decorator";

    @Component({
        components: {
            Header,
            Footer,
        },
    })
    export default class Layout extends Vue {
        @Inject(TYPES.Theme)
        protected theme!: ThemeI;

        protected unlockedThemes = this.theme.getUnlockedThemes();

        protected handleThemeUnlock(newTheme: Theme): void {
            const themeName = this.$i18n.t(`common.themes.${newTheme.getKey()}`);
            const toastTitle = `${newTheme.getEmoji()} ${this.$i18n.t("layout.app.themeUnlockToast.title")}`;
            const toastDescription = this.$i18n.t("layout.app.themeUnlockToast.description", {
                theme: themeName
            });

            this.$bvToast.toast(
                <string>toastDescription,
                {
                    title: toastTitle,
                    autoHideDelay: 5000,
                },
            );

            this.unlockedThemes = this.theme.getUnlockedThemes();
        }
    };
</script>
