import "reflect-metadata";
import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import VueClipboard from "vue-clipboard2";
import BootstrapVue from "bootstrap-vue";
import VueScrollTo from "vue-scrollto";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

VueClipboard.config.autoSetContainer = true;
Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(VueClipboard);
Vue.use(BootstrapVue);
Vue.use(VueScrollTo);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
