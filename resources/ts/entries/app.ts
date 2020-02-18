import "whatwg-fetch";
import "@/entries/bootstrap";
import "@/bootstrap-vue";
import Vue, { VNode } from "vue";
import VueI18n from "vue-i18n";
import VueClipboard from "vue-clipboard2";
import VueScrollTo from "vue-scrollto";
import VueGtag from "vue-gtag";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/icons";
import { container } from "@/container/container";
import { TYPES } from "@/container/types";
import App from "@/components/layout/App.vue";
import { GoogleAnalyticsI } from "@/container/contracts/googleAnalyticsI";
import router from "@/router";
import store from "@/store";

config.autoAddCss = false;
VueClipboard.config.autoSetContainer = true;

Vue.use(VueClipboard);
Vue.use(VueScrollTo);

const googleAnalytics = container.get<GoogleAnalyticsI>(TYPES.GoogleAnalytics);

if (googleAnalytics.isConfigured()) {
    Vue.use(VueGtag, {
        config: {
            id: googleAnalytics.getApplicationId(),
            params: {
                "send_page_view": false,
            },
        },
        bootstrap: false,
    }, router);
}

Vue.component("FontAwesomeIcon", FontAwesomeIcon);

new Vue({
    el: "#app",
    router,
    store,
    i18n: container.get<VueI18n>(TYPES.VueI18n),
    render: (h): VNode => h(App),
});

