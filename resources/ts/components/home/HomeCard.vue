<template>
  <BCol
    class="my-2"
    lg
  >
    <BCard
      class="h-100"
      body-class="d-flex justify-content-between flex-column"
    >
      <BCardTitle class="mb-4">
        {{ $t(`views.home.features.${feature}.title`) }}
      </BCardTitle>

      <BCardText>
        {{ $t(`views.home.features.${feature}.description`) }}
      </BCardText>

      <BCardText class="text-right mt-2">
        <BButton
          :to="to"
          :href="href"
          class="py-2 px-4"
        >
          {{ $t(`views.home.features.${feature}.button`) }}
        </BButton>
      </BCardText>
    </BCard>
  </BCol>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Location } from "vue-router";
    import { Component, Prop } from "vue-property-decorator";

    @Component
    export default class HomeCard extends Vue {
        @Prop(String)
        protected readonly feature!: string;

        @Prop(Object)
        protected readonly to?: Location;

        @Prop(String)
        protected readonly href?: string;
    }
</script>
