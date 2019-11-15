import "whatwg-fetch";
import "@/entries/bootstrap";
import "@/bootstrap-vue";
import Vue from "vue";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";
import VueClipboard from "vue-clipboard2";
import VueScrollTo from "vue-scrollto";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/icons";
import { container } from "@/container/container";
import { TYPES } from "@/container/types";
import App from "@/components/layout/App.vue";

config.autoAddCss = false;
VueClipboard.config.autoSetContainer = true;

Vue.use(VueRouter);
Vue.use(VueClipboard);
Vue.use(VueScrollTo);

Vue.component("FontAwesomeIcon", FontAwesomeIcon);

new Vue({
    el: "#app",
    router: container.get<VueRouter>(TYPES.VueRouter),
    i18n: container.get<VueI18n>(TYPES.VueI18n),
    template: "<App/>",
    components: {
        App,
    },
});
