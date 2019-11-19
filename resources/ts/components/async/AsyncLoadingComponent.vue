<template>
    <BContainer class="mt-5 h-100 d-flex flex-column align-items-center justify-content-center text-center">
        <div style="max-width: 600px;">
            <FontAwesomeIcon icon="circle-notch"
                             size="3x"
                             class="fa-spin"></FontAwesomeIcon>
            <h2 class="mt-3">{{ $t("components.async.asyncLoadingComponent.title") }}</h2>
        </div>
    </BContainer>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    @Component
    export default class AsyncLoadingComponent extends Vue {
    };
</script>

<style scoped>

</style>
