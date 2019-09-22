import Vue from 'vue';
import i18n from '@/i18n';
import Theme from '@/services/Theme';
import Locale from '@/services/Locale';
import DocsNav from '@/components/docs/DocsNav';

Theme.initTheme();
Locale.initLocale();

window.$docsify = {
    name: 'PhpUnitGen',
    loadSidebar: true,
    basePath: '/docs',
    notFoundPage: true,
    auto2top: true,
    search: {
        noData: {
            '/fr/': 'Aucun résultat !',
            '/': 'No results!',
        },
        paths: 'auto',
        placeholder: {
            '/fr/': 'Recherche',
            '/': 'Search',
        },
    },
};

new Vue({
    el: 'nav.app-nav.no-badge',
    i18n,
    template: '<DocsNav/>',
    components: { DocsNav },
});
