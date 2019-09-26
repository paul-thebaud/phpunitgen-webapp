import Vue from 'vue';
import i18n from '@/i18n';
import DocsNav from '@/components/docs/DocsNav';
import { configManager, localeManager } from '@/services';

// When arriving on the page with the wrong locale, change to the right one.
const locale = configManager.get('locale');
const path = window.location.href.replace(/^.*\/docs#?\/?/, '');
const realPath = path.replace(/^[a-z]{2}\//, '');
if (locale === 'en') {
    if (path.match(/^[a-z]{2}\//)) {
        window.location.hash = localeManager.getDocumentationPath(realPath, locale).replace(/^\/docs#/, '');
    }
} else {
    if (path.indexOf(locale) !== 0) {
        window.location.hash = localeManager.getDocumentationPath(realPath, locale).replace(/^\/docs#/, '');
    }
}

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
            '/fr/': 'Recherche...',
            '/': 'Search...',
        },
    },
};

new Vue({
    el: 'nav.app-nav.no-badge',
    i18n,
    template: '<DocsNav/>',
    components: { DocsNav },
});
