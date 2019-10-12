export default class {
    constructor(storage, window) {
        this.storage = storage;
        this.window = window;
    }

    initialize() {
        this.redirectIfNeeded();
        this.initializeDocsify();
    }

    redirectIfNeeded() {
        const locale = this.storage.get('locale');
        const path = this.window.location.href.replace(/^.*\/docs#?\/?/, '');
        const realPath = path.replace(/^[a-z]{2}\//, '');
        if (locale === 'en') {
            if (path.match(/^[a-z]{2}\//)) {
                this.changeHash(realPath, locale);
            }
        } else {
            if (path.indexOf(locale) !== 0) {
                this.changeHash(realPath, locale);
            }
        }
    }

    initializeDocsify() {
        window.$docsify = {
            name: 'PhpUnitGen',
            loadSidebar: true,
            basePath: '/docs',
            notFoundPage: true,
            auto2top: true,
            search: {
                hideOtherSidebarContent: true,
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
    }

    changeHash(realPath, locale) {
        this.window.location.hash = this.getDocumentationPath(realPath, locale)
            .replace(/^\/docs#/, '');
    }

    getDocumentationPath(path = '', targetedLocale = null) {
        const locale = targetedLocale || this.storage.get('locale', 'en');
        if (locale !== 'en') {
            return `/docs#/${locale}/${path}`;
        }

        return `/docs#/${path}`;
    }
}
