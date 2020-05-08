<template>
  <BContainer class="my-5 h-100 d-flex flex-column align-items-center justify-content-center">
    <h1 class="display-2">
      {{ $t("views.notFound.display") }}
    </h1>
    <h1>
      {{ $t("views.notFound.title") }}
    </h1>
    <p>
      {{ $t("views.notFound.description") }}
    </p>
    <BButton
      variant="primary"
      :to="{ name: 'home' }"
    >
      {{ $t("views.notFound.backHome") }}
    </BButton>
  </BContainer>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    @Component
    export default class NotFoundView extends Vue {
    }
</script>
