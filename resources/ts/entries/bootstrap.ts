import "reflect-metadata";
import "whatwg-fetch";
import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import VueClipboard from "vue-clipboard2";
import BootstrapVue from "bootstrap-vue";
import VueScrollTo from "vue-scrollto";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/icons";

config.autoAddCss = false;
VueClipboard.config.autoSetContainer = true;
Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(VueClipboard);
Vue.use(BootstrapVue);
Vue.use(VueScrollTo);

Vue.component("FontAwesomeIcon", FontAwesomeIcon);
