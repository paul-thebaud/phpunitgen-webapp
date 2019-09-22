import i18n from '@/i18n/index';

export default {
    availableLocales() {
        return {
            en: 'English',
            fr: 'Français',
        };
    },

    initLocale() {
        i18n.locale = localStorage.getItem('pug_locale') || 'en';
    },

    setLocale(locale) {
        localStorage.setItem('pug_locale', locale);
        i18n.locale = locale;
    },

    getLocale() {
        return i18n.locale;
    },

    getDocumentationPath(path = '', targetedLocale = null) {
        const locale = targetedLocale || this.getLocale();
        if (locale !== 'en') {
            return `/docs#/${locale}/${path}`;
        }

        return `/docs#/${path}`;
    },
};
