<template>
  <BContainer class="my-5">
    <h1>
      {{ $t("views.cookies.title") }}
    </h1>
    <p>
      {{ $t("views.cookies.description") }}
    </p>
    <BFormCheckbox
      id="cookies"
      :value="true"
      :unchecked-value="false"
      :checked="analyticsActivated === true"
      switch
      @input="handleCheckedChange"
    >
      {{ $t("views.cookies.activeLabel") }}
    </BFormCheckbox>
  </BContainer>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Watch } from "vue-property-decorator";
    import { Action, State } from "vuex-class";

    @Component
    export default class CookiesView extends Vue {
        @State
        protected readonly analyticsActivated!: boolean | null;

        @Action
        protected readonly requestAnalyticsChange!: (newActive: boolean) => Promise<void>;

        protected activeChecked = this.analyticsActivated === true;

        @Watch("activeChecked")
        protected async handleActiveCheckedChange(newValue: boolean): Promise<void> {
            await this.requestAnalyticsChange(newValue);
        }

        protected async handleCheckedChange(newValue: boolean): Promise<void> {
            await this.requestAnalyticsChange(newValue);
        }
    }
</script>
