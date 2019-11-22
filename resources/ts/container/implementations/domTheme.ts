import { Theme } from "@/container/concerns/theme";
import { StoreI } from "@/container/contracts/storeI";
import { ThemeI } from "@/container/contracts/themeI";
import { TYPES } from "@/container/types";
import { inject, injectable } from "inversify";
import { Dictionary } from "@/utils/types";

/**
 * The default theme.
 */
const baseTheme = "light";

/**
 * The list of themes map by key.
 */
const themes = {
    light: new Theme("light", "💡", "default", 0),
    dark: new Theme("dark", "🕶️", "darcula", 0),
    night: new Theme("night", "🌙", "erlang-dark", 2),
    forest: new Theme("forest", "🌳", "blackboard", 5),
    ocean: new Theme("ocean", "🌊", "tomorrow-night-eighties", 10),
    desert: new Theme("desert", "🏜️", "pastel-on-dark", 15),
    rainbow: new Theme("rainbow", "🌈", "default", 20),
    unicorn: new Theme("unicorn", "🦄", "darcula", 25),
    original: new Theme("original", "📟", "default", 30),
} as Dictionary<Theme>;

/**
 * Class DomTheme.
 *
 * The theme manager which interacts with the DOM to update theme.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
@injectable()
export class DomTheme implements ThemeI {
    /**
     * The window object to update classes when theme is changed.
     */
    protected window: Window;

    /**
     * The store to check for generations count and current theme.
     */
    protected store: StoreI;

    /**
     * The current theme.
     */
    protected theme: Theme;

    /**
     * DomTheme constructor.
     *
     * @param {Window} window
     * @param {StoreI} store
     */
    public constructor(
        @inject(TYPES.Window) window: Window,
        @inject(TYPES.Store) store: StoreI,
    ) {
        this.window = window;
        this.store = store;

        const themeKey = this.store.getTheme();
        if (themeKey in themes) {
            this.theme = themes[themeKey];
            if (this.theme.getKey() !== baseTheme) {
                this.updateDom(themes[baseTheme], this.theme);
            }

            return;
        }

        this.theme = themes[baseTheme];
    }

    /**
     * Get the current theme.
     *
     * @returns {Theme}
     */
    public get currentTheme(): Theme {
        return this.theme;
    }

    /**
     * Change the current theme.
     *
     * @param {Theme} theme
     */
    public set currentTheme(theme: Theme) {
        if (this.theme === theme || ! (theme.getKey() in themes)) {
            return;
        }

        this.updateDom(this.theme, theme);
        this.theme = theme;
        this.store.setTheme(theme.getKey()).save();
    }

    /**
     * @inheritDoc
     */
    public getThemes(): Theme[] {
        return Object.keys(themes).map((key: string): Theme => themes[key]);
    }

    /**
     * @inheritDoc
     */
    public getUnlockedThemes(): Theme[] {
        return this.getThemes().filter((theme: Theme): boolean => this.isUnlocked(theme));
    }

    /**
     * @inheritDoc
     */
    public getNextUnlockedTheme(): Theme | null {
        const generationsCount = this.store.getGenerationsCount();

        for (const theme of this.getThemes()) {
            if (generationsCount < theme.getGenerationsToUnlock()) {
                return theme;
            }
        }

        return null;
    }

    /**
     * @inheritDoc
     */
    public isUnlocked(theme: Theme): boolean {
        return this.store.getGenerationsCount() >= theme.getGenerationsToUnlock();
    }

    /**
     * Update the DOM to switch from previous to new theme.
     *
     * @param {Theme} previousTheme
     * @param {Theme} newTheme
     */
    protected updateDom(previousTheme: Theme, newTheme: Theme): void {
        const bodyClassList = window.document.body.classList;
        const codeMirrors = window.document.querySelectorAll(".CodeMirror");

        bodyClassList.add("theme-switching");
        bodyClassList.add(this.computeThemeClass(newTheme));
        if (codeMirrors.length && previousTheme.getCodeMirror() !== newTheme.getCodeMirror()) {
            codeMirrors.forEach(codeMirror => {
                const codeMirrorClassList = codeMirror.classList;
                codeMirrorClassList.add(`cm-s-${newTheme.getCodeMirror()}`);
                codeMirrorClassList.remove(`cm-s-${previousTheme.getCodeMirror()}`);
            });
        }
        bodyClassList.remove(this.computeThemeClass(previousTheme));

        setTimeout((): void => {
            bodyClassList.remove("theme-switching");
        }, 500);
    }

    /**
     * Compute the theme to its CSS class name.
     *
     * @param {Theme} theme
     *
     * @returns {string}
     */
    protected computeThemeClass(theme: Theme): string {
        return `theme-${theme.getKey()}`;
    }
}
