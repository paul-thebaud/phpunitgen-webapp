<template>
  <BContainer class="my-5 h-100 d-flex align-items-center justify-content-center">
    <h1>
      <code class="font-weight-bold">$this->assertTrue($unicorn->exists());</code>
    </h1>
  </BContainer>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    @Component
    export default class UnicornView extends Vue {
    }
</script>
