<template>
  <div id="app">
    <HeaderNav />
    <div class="wrapper flex-grow-1">
      <RouterView />
    </div>
    <FooterNav :style="cookiesShouldDisplay ? 'margin-bottom: 120px;' : ''" />
    <CookiesInfo v-if="cookiesShouldDisplay" />
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import { Action, State } from "vuex-class";
    import HeaderNav from "@/components/layout/HeaderNav.vue";
    import FooterNav from "@/components/layout/FooterNav.vue";
    import CookiesInfo from "@/components/common/CookiesInfo.vue";

    @Component({
        components: {
            CookiesInfo,
            HeaderNav,
            FooterNav,
        },
    })
    export default class AppLayout extends Vue {
        @State
        protected readonly analyticsActivated!: boolean | null;

        @Action
        protected readonly initAnalytics!: () => Promise<void>;

        protected get cookiesShouldDisplay(): boolean {
            return this.analyticsActivated === null;
        }

        protected created(): void {
            this.initAnalytics();
        }
    }
</script>
