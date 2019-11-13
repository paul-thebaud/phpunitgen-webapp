<template>
    <div id="app">
        <HeaderNav @theme-change="handleThemeChange"
                   :themes="unlockedThemes"
                   :current-theme="currentTheme"/>
        <div class="wrapper">
            <RouterView @theme-unlock="handleThemeUnlock"
                        @theme-change="handleThemeChange"
                        :current-theme="currentTheme"/>
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
    import { StoreI } from "@/container/contracts/storeI";

    @Component({
        components: {
            HeaderNav,
            FooterNav,
        },
    })
    export default class Layout extends Vue {
        @Inject(TYPES.Theme)
        protected theme!: ThemeI;

        @Inject(TYPES.Store)
        protected store!: StoreI;

        protected currentTheme: Theme = this.theme.getTheme();

        protected unlockedThemes = this.theme.getUnlockedThemes();

        protected generationsCount = this.store.getGenerationsCount();

        protected handleThemeChange(newTheme: Theme) {
            if (! this.theme.isUnlocked(newTheme)) {
                return;
            }

            this.currentTheme = newTheme;
            this.theme.changeTheme(this.currentTheme);
        }

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
