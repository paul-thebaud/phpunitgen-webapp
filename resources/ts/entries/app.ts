import Vue from "vue";
import VueI18n from "vue-i18n";
import "@/entries/bootstrap";
import { container } from "@/container/container";
import { TYPES } from "@/container/types";
import App from "@/components/layout/App.vue";
import { VueRouter } from "vue-router/types/router";

new Vue({
    el: "#app",
    router: container.get<VueRouter>(TYPES.VueRouter),
    i18n: container.get<VueI18n>(TYPES.VueI18n),
    template: "<App/>",
    components: {
        App,
    },
});
