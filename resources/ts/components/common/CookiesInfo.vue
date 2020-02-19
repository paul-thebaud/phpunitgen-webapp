<template>
  <div
    v-if="cookiesAccepted === null"
    class="cookies-info-wrapper"
  >
    <p>
      {{ $t("common.cookies.description") }}
    </p>
    <div class="buttons">
      <button
        type="button"
        class="btn-accept"
        @click="handleAcceptCookies"
      >
        {{ $t("common.cookies.accept") }}
      </button>
      <button
        type="button"
        class="btn-refuse"
        @click="handleRefuseCookies"
      >
        {{ $t("common.cookies.refuse") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Inject, Watch } from "vue-property-decorator";
    import { TYPES } from "@/container/types";
    import { GoogleAnalyticsI } from "@/container/contracts/googleAnalyticsI";

    @Component
    export default class CookiesInfo extends Vue {
        @Inject(TYPES.GoogleAnalytics)
        protected readonly googleAnalytics!: GoogleAnalyticsI;

        protected analyticsActivated = false;

        protected cookiesAccepted: boolean | null = null;

        protected created(): void {
            this.cookiesAccepted = this.googleAnalytics.isChecked()
                ? this.googleAnalytics.isAccepted()
                : null;

            this.activateGoogleAnalyticsIfNeeded();
        }

        protected handleAcceptCookies(): void {
            this.googleAnalytics.accept();
            this.cookiesAccepted = true;

            this.$emit("google-analytics-accepted");

            this.activateGoogleAnalyticsIfNeeded();
        }

        protected handleRefuseCookies(): void {
            this.googleAnalytics.refuse();
            this.cookiesAccepted = false;
        }

        @Watch("cookiesAccepted")
        protected emitCookiesHiddenIfNeeded(cookiesAccepted: boolean | null): void {
            if (cookiesAccepted !== null) {
                this.$emit("cookies-hidden");
            }
        }

        protected activateGoogleAnalyticsIfNeeded(): void {
            if (this.cookiesAccepted && ! this.analyticsActivated) {
                this.$emit("google-analytics-activated");

                this.analyticsActivated = true;
            }
        }
    }
</script>
