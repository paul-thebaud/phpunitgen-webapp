import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from '@/views/App';
import router from '@/router';
import i18n from '@/i18n';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    i18n,
    template: '<App/>',
    components: { App },
});
