<template>
  <BContainer class="mt-5 h-100 d-flex flex-column align-items-center justify-content-center text-center">
    <div style="max-width: 600px;">
      <FontAwesomeIcon
        icon="bomb"
        size="3x"
      />
      <h2 class="mt-3">
        {{ $t("components.async.asyncErrorComponent.title") }}
      </h2>
      <p>{{ $t("components.async.asyncErrorComponent.description") }}</p>
      <BButton @click="handleReload">
        {{ $t("components.async.asyncErrorComponent.reloadButton") }}
      </BButton>
    </div>
  </BContainer>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    @Component
    export default class AsyncErrorComponent extends Vue {
        protected handleReload(): void {
            window.location.reload();
        }
    }
</script>

<style scoped>

</style>
