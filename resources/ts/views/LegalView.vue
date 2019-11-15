<template>
    <BContainer class="my-5">
        <h1>{{ $t("views.legal.title") }}</h1>
        <p v-html="$t('views.legal.content')"></p>
    </BContainer>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    @Component
    export default class LegalView extends Vue {
    };
</script>
