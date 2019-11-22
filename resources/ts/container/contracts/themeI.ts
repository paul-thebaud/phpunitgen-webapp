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
     * The current theme.
     */
    currentTheme: Theme;

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
     * Get the next theme to unlock, null if all unlocked.
     *
     * @returns {Theme | null}
     */
    getNextUnlockedTheme(): Theme | null;

    /**
     * Check if the given theme is unlocked.
     *
     * @param {Theme} theme
     *
     * @returns {boolean}
     */
    isUnlocked(theme: Theme): boolean;
}
