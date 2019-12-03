import { Dictionary } from "@/utils/types";

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
     * The current locale.
     */
    currentLocale: string;

    /**
     * Retrieve the available locales with their associated human readable name.
     *
     * @returns {Dictionary<string>}
     */
    getLocales(): Dictionary<string>;
}
