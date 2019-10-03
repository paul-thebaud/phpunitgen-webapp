export default class {
    constructor(configManager, localeManager, window) {
        this.configManager = configManager;
        this.localeManager = localeManager;
        this.window = window;
    }

    initialize() {
        this.redirectIfNeeded();
        this.initializeDocsify();
    }

    redirectIfNeeded() {
        const locale = this.configManager.get('locale');
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
        this.window.location.hash = this.localeManager
            .getDocumentationPath(realPath, locale).replace(/^\/docs#/, '');
    }
}
