import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Tool from '@/views/Tool';
import Configuration from '@/views/Configuration';
import Legal from '@/views/Legal';
import Themes from '@/views/Themes';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/tool', name: 'tool', component: Tool },
        { path: '/tool/configuration', name: 'configuration', component: Configuration },
        { path: '/legal', name: 'legal', component: Legal },
        { path: '/themes', name: 'themes', component: Themes },
    ],
});
