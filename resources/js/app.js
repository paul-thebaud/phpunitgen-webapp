import Vue from 'vue';
import App from '@/views/App';
import router from '@/router';

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});
