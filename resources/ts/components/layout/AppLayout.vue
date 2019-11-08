<template>
    <div id="app">
        <HeaderNav :themes="unlockedThemes"/>
        <div class="wrapper">
            <RouterView @theme-unlock="handleThemeUnlock"/>
        </div>
        <FooterNav/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import HeaderNav from "@/components/layout/HeaderNav.vue";
    import FooterNav from "@/components/layout/FooterNav.vue";
    import { TYPES } from "@/container/types";
    import { ThemeI } from "@/container/contracts/themeI";
    import { Theme } from "@/container/concerns/theme";
    import { Component, Inject } from "vue-property-decorator";

    @Component({
        components: {
            HeaderNav,
            FooterNav,
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
