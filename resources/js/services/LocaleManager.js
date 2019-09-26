export default class {
    get availableLocales() {
        return {
            en: 'English',
            fr: 'Français',
        };
    }

    constructor(configManager, i18n) {
        this.configManager = configManager;
        this.i18n = i18n;

        this.i18n.locale = this.configManager.get('locale', 'en');
    }

    changeLocale(locale) {
        this.i18n.locale = locale;
        this.configManager.set('locale', locale);
    }

    getDocumentationPath(path = '', targetedLocale = null) {
        const locale = targetedLocale || this.configManager.get('locale', 'en');
        if (locale !== 'en') {
            return `/docs#/${locale}/${path}`;
        }

        return `/docs#/${path}`;
    }
}
