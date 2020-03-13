<template>
  <a href="/">
    <PhpUnitGenLogo />
  </a>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import PhpUnitGenLogo from "@/components/common/PhpUnitGenLogo.vue";

    @Component({
        components: { PhpUnitGenLogo },
    })
    export default class PhpUnitGenLogoLink extends Vue {
    }
</script>
