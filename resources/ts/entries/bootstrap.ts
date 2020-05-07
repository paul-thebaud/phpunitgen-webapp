import "@scss/entries/vendor";
import "reflect-metadata";
import Vue from "vue";
import VueI18n from "vue-i18n";
import SvgVue from "svg-vue";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/icons";

config.autoAddCss = false;
Vue.config.productionTip = false;

Vue.use(VueI18n);
Vue.use(SvgVue);
Vue.component("FontAwesomeIcon", FontAwesomeIcon);
