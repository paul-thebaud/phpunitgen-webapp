import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Theme from '@/views/Theme';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/profile/themes', name: 'profile.themes', component: Theme },
    ],
});
