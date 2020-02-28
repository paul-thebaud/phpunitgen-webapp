<template>
  <div class="cookies-info-wrapper">
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
    import { Component } from "vue-property-decorator";
    import { Action } from "vuex-class";

    @Component
    export default class CookiesInfo extends Vue {
        @Action
        protected readonly requestAnalyticsChange!: (newActive: boolean) => Promise<void>;

        protected async handleAcceptCookies(): Promise<void> {
            await this.requestAnalyticsChange(true);
        }

        protected async handleRefuseCookies(): Promise<void> {
            await this.requestAnalyticsChange(false);
        }
    }
</script>
