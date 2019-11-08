<template>
    <AppLayout/>
</template>

<script lang="ts">
    import Vue from "vue";
    import { container } from "@/container/container";
    import { TYPES } from "@/container/types";
    import { Component } from "vue-property-decorator";
    import AppLayout from "@/components/layout/AppLayout.vue";

    const provide: { [key: string]: any } = {};
    Object.keys(TYPES).forEach(key => {
        const symbol = (<any>TYPES)[key];

        provide[symbol] = container.get(symbol);
    });

    @Component({
        components: {
            AppLayout
        },
        provide,
    })
    export default class App extends Vue {
    }
</script>
