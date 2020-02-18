<template>
  <div id="app">
    <HeaderNav
      :themes="unlockedThemes"
      :current-theme="currentTheme"
      @theme-change="handleThemeChange"
    />
    <div class="wrapper flex-grow-1">
      <RouterView
        :current-theme="currentTheme"
        @theme-unlock="handleThemeUnlock"
        @theme-change="handleThemeChange"
      />
    </div>
    <FooterNav />
    <CookiesInfo @google-analytics-activated="handleGoogleAnalyticsActivated" />
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Inject } from "vue-property-decorator";
    import { bootstrap } from "vue-gtag";
    import HeaderNav from "@/components/layout/HeaderNav.vue";
    import FooterNav from "@/components/layout/FooterNav.vue";
    import { TYPES } from "@/container/types";
    import { ThemeI } from "@/container/contracts/themeI";
    import { Theme } from "@/container/concerns/theme";
    import CookiesInfo from "@/components/common/CookiesInfo.vue";
    import { GoogleAnalyticsI } from "@/container/contracts/googleAnalyticsI";

    @Component({
        components: {
            CookiesInfo,
            HeaderNav,
            FooterNav,
        },
    })
    export default class AppLayout extends Vue {
        @Inject(TYPES.Theme)
        protected theme!: ThemeI;

        @Inject(TYPES.GoogleAnalytics)
        protected googleAnalytics!: GoogleAnalyticsI;

        protected currentTheme: Theme = this.theme.currentTheme;

        protected unlockedThemes = this.theme.getUnlockedThemes();

        protected handleThemeChange(newTheme: Theme): void {
            if (! this.theme.isUnlocked(newTheme)) {
                return;
            }

            this.theme.currentTheme = this.currentTheme = newTheme;
        }

        protected handleThemeUnlock(newTheme: Theme): void {
            const themeName = this.$i18n.t(`common.themes.${newTheme.getKey()}`);
            const toastTitle = `${newTheme.getEmoji()} ${this.$i18n.t("layout.app.themeUnlockToast.title")}`;
            const toastDescription = this.$i18n.t("layout.app.themeUnlockToast.description", {
                theme: themeName,
            });

            this.$bvToast.toast(
                toastDescription as string,
                {
                    title: toastTitle,
                    autoHideDelay: 5000,
                },
            );

            this.unlockedThemes = this.theme.getUnlockedThemes();
        }

        protected handleGoogleAnalyticsActivated(): void {
            if (this.googleAnalytics.isConfigured()) {
                bootstrap().then(() => {
                    this.$gtag.pageview({
                        "page_title": this.$route.name,
                        "page_path": this.$route.path,
                        "page_location": window.location.href,
                    });
                });
            }
        }
    }
</script>
