import Vue from 'vue';
import i18n from '@/i18n';
import DocsNav from '@/components/docs/DocsNav';
import { docsManager } from '@/services';

docsManager.initialize();

new Vue({
    el: 'nav.app-nav.no-badge',
    i18n,
    template: '<DocsNav/>',
    components: { DocsNav },
});
