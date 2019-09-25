import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Tool from '@/views/Tool';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/tool', name: 'tool', component: Tool },
    ],
});
