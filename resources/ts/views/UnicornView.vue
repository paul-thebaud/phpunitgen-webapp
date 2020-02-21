<template>
  <BContainer class="my-5 h-100 d-flex align-items-center justify-content-center">
    <span class="d-none d-lg-block font-weight-bold h2">
      <code>$this->assertTrue($unicorn->exists());</code>
    </span>
    <span class="d-block d-lg-none font-weight-bold h5">
      <code>$this->assertTrue($unicorn->exists());</code>
    </span>
  </BContainer>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    @Component
    export default class UnicornView extends Vue {
    }
</script>
