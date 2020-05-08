<template>
  <AppLayout />
</template>

<script lang="ts">
    import Vue from "vue";
    import { container } from "@/container/container";
    import { TYPES } from "@/container/types";
    import { Component } from "vue-property-decorator";
    import AppLayout from "@/components/layout/AppLayout.vue";
    import { Dictionary } from "@/utils/types";

    const provide = {} as Dictionary<object>;
    Object.keys(TYPES).forEach(key => {
        const symbol = (TYPES as Dictionary<symbol>)[key];

        provide[symbol as unknown as string] = container.get(symbol);
    });

    @Component({
        components: {
            AppLayout,
        },
        provide,
    })
    export default class App extends Vue {
    }
</script>
