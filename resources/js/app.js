import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from '@/views/App';
import router from '@/router';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});
