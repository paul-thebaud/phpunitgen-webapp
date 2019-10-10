export default class {
    static get availableLocales() {
        return {
            en: 'English',
            fr: 'Français',
        };
    }

    constructor(storage, i18n) {
        this.storage = storage;
        this.i18n = i18n;

        this.i18n.locale = this.storage.get('locale', 'en');
    }

    changeLocale(locale) {
        this.i18n.locale = locale;
        this.storage.set('locale', locale);
    }
}
