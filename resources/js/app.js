import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import BootstrapVue from 'bootstrap-vue';
import VueScrollTo from 'vue-scrollto';
import App from '@/views/App';
import router from '@/router';
import i18n from '@/i18n';

VueClipboard.config.autoSetContainer = true;
Vue.config.productionTip = false;

Vue.use(VueClipboard);
Vue.use(BootstrapVue);
Vue.use(VueScrollTo);

new Vue({
    el: '#app',
    router,
    i18n,
    template: '<App/>',
    components: {
        App,
    },
});
