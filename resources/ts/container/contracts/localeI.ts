/**
 * Interface LocaleI.
 *
 * The locale manager.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
export interface LocaleI {
    /**
     * Retrieve the available locales with their associated human readable name.
     *
     * @returns {{[p: string]: string}}
     */
    getLocales(): { [key: string]: string };

    /**
     * Get the current locale.
     *
     * @returns {string}
     */
    getLocale(): string;

    /**
     * Change the current locale, and save it in storage.
     *
     * @param {string} locale
     */
    changeLocale(locale: string): void;
}
