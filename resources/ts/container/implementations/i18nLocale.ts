import { LocaleI } from "@/container/contracts/localeI";
import { StoreI } from "@/container/contracts/storeI";
import { TYPES } from "@/container/types";
import { inject, injectable } from "inversify";
import VueI18n from "vue-i18n";
import { Dictionary } from "@/utils/types";

/**
 * The available locales.
 */
export const locales: Dictionary<string> = {
    en: "English",
    fr: "Français",
};

/**
 * Class I18nLocale.
 *
 * The locale manager using VueI18n.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
@injectable()
export class I18nLocale implements LocaleI {
    /**
     * The window object to use for lang definition.
     */
    protected window: Window;

    /**
     * The Vue I18n instance.
     */
    protected vueI18n: VueI18n;

    /**
     * The store to save locale.
     */
    protected store: StoreI;

    /**
     * The current locale.
     */
    protected locale: string;

    /**
     * I18nLocale constructor.
     *
     * @param {Window} window
     * @param {VueI18n} vueI18n
     * @param {StoreI} store
     */
    public constructor(
        @inject(TYPES.Window) window: Window,
        @inject(TYPES.VueI18n) vueI18n: VueI18n,
        @inject(TYPES.Store) store: StoreI,
    ) {
        this.window = window;
        this.vueI18n = vueI18n;
        this.store = store;
        this.locale = this.vueI18n.locale = this.store.getLocale();

        this.updateHtmlLang();
    }

    /**
     * Get the current locale.
     *
     * @returns {string}
     */
    public get currentLocale(): string {
        return this.locale;
    }

    /**
     * Define the current locale.
     *
     * @param {string} locale
     */
    public set currentLocale(locale: string) {
        if (locale === this.locale) {
            return;
        }

        this.locale = this.vueI18n.locale = locale;
        this.store.setLocale(locale).save();

        this.updateHtmlLang();
    }

    /**
     * @inheritDoc
     */
    public getLocales(): { [p: string]: string } {
        return locales;
    }

    /**
     * @inheritDoc
     */
    public localizedDocs(route = ""): string {
        return `/docs#/${this.currentLocale}/${route}`;
    }

    /**
     * Update the HTML element lang attribute with the current locale.
     */
    protected updateHtmlLang(): void {
        const htmlElement = this.window.document.querySelector("html");
        if (htmlElement) {
            htmlElement.setAttribute("lang", this.locale);
        }
    }
}
