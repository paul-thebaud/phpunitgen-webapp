import Vue from 'vue';
import i18n from '@/i18n';
import Theme from '@/services/Theme';
import Locale from '@/services/Locale';
import DocsNav from '@/components/docs/DocsNav';

Theme.initTheme();
Locale.initLocale();

// When arriving on the page with the wrong locale, change to the right one.
const locale = Locale.getLocale();
const path = window.location.href.replace(/^.*\/docs#?\/?/, '');
const realPath = path.replace(/^[a-z]{2}\//, '');
if (locale === 'en') {
    if (path.match(/^[a-z]{2}\//)) {
        window.location.hash = Locale.getDocumentationPath(realPath, locale).replace(/^\/docs#/, '');
    }
} else {
    if (path.indexOf(locale) !== 0) {
        window.location.hash = Locale.getDocumentationPath(realPath, locale).replace(/^\/docs#/, '');
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
