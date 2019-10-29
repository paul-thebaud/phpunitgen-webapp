import { Theme } from "@/container/concerns/theme";

/**
 * Interface ThemeI.
 *
 * The theme manager.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
export interface ThemeI {
    /**
     * Get the themes list.
     *
     * @returns {Theme[]}
     */
    getThemes(): Theme[];

    /**
     * Get the unlocked themes list.
     *
     * @returns {Theme[]}
     */
    getUnlockedThemes(): Theme[];

    /**
     * Get the current theme.
     *
     * @returns {Theme}
     */
    getTheme(): Theme;

    /**
     * Change the current theme, and save it in storage.
     *
     * @param {Theme} theme
     */
    changeTheme(theme: Theme): void;

    /**
     * Check if the given theme is unlocked.
     *
     * @param {Theme} theme
     *
     * @returns {boolean}
     */
    isUnlocked(theme: Theme): boolean;
}
