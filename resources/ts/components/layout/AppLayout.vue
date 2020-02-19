<template>
  <div id="app">
    <HeaderNav />
    <div class="wrapper flex-grow-1">
      <RouterView />
    </div>
    <FooterNav :style="cookiesDisplayed ? 'margin-bottom: 120px;' : ''" />
    <CookiesInfo
      @google-analytics-activated="handleGoogleAnalyticsActivated"
      @cookies-hidden="handleCookiesHidden"
    />
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
        protected readonly theme!: ThemeI;

        @Inject(TYPES.GoogleAnalytics)
        protected readonly googleAnalytics!: GoogleAnalyticsI;

        protected cookiesDisplayed = true;

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

        protected handleCookiesHidden(): void {
            this.cookiesDisplayed = false;
        }
    }
</script>
