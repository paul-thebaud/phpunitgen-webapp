import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueClipboard from 'vue-clipboard2';
import App from '@/views/App';
import router from '@/router';
import i18n from '@/i18n';

VueClipboard.config.autoSetContainer = true;
Vue.config.productionTip = false;

Vue.use(VueClipboard);
Vue.use(BootstrapVue);

new Vue({
    el: '#app',
    router,
    i18n,
    template: '<App/>',
    components: {
        App,
    },
});
