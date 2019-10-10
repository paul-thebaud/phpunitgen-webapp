import Vue from 'vue';
import i18n from '@/i18n';
import DocsNav from '@/components/docs/DocsNav';
import { docs } from '@/services';

docs.initialize();

new Vue({
    el: 'nav.app-nav.no-badge',
    i18n,
    template: '<DocsNav/>',
    components: { DocsNav },
});
