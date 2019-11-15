<template>
    <BContainer class="my-5 text-center">
        <h1 class="display-1 font-weight-bold">{{ $t("views.lost.title") }}</h1>
        <p class="font-weight-bold">{{ $t("views.lost.description") }}</p>
        <BButton :to="{ name: 'home' }"
                 variant="secondary">
            {{ $t("views.lost.backHome") }}
        </BButton>
    </BContainer>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    @Component
    export default class LostView extends Vue {
    };
</script>
