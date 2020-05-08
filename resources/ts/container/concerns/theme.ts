export class Theme {
    /**
     * The key used for translation and theme's class computation.
     */
    protected key: string;

    /**
     * The emoji which describes the theme.
     */
    protected emoji: string;

    /**
     * The codemirror editor class to use.
     */
    protected codeMirror: string;

    /**
     * The number of generations needed to unlock the theme.
     */
    protected generationsToUnlock: number;

    /**
     * If this theme has fully accessible colors..
     */
    protected accessibleColors: boolean;

    /**
     * Theme constructor.
     *
     * @param {string} key
     * @param {string} emoji
     * @param {string} codeMirror
     * @param {number} generationsToUnlock
     * @param {boolean} accessibleColors
     */
    public constructor(key: string, emoji: string, codeMirror: string, generationsToUnlock: number, accessibleColors: boolean) {
        this.key = key;
        this.emoji = emoji;
        this.codeMirror = codeMirror;
        this.generationsToUnlock = generationsToUnlock;
        this.accessibleColors = accessibleColors;
    }

    /**
     * @returns {string}
     */
    public getKey(): string {
        return this.key;
    }

    /**
     * @returns {string}
     */
    public getEmoji(): string {
        return this.emoji;
    }

    /**
     * @returns {string}
     */
    public getCodeMirror(): string {
        return this.codeMirror;
    }

    /**
     * @returns {number}
     */
    public getGenerationsToUnlock(): number {
        return this.generationsToUnlock;
    }

    /**
     * @returns {boolean}
     */
    public hasAccessibleColors(): boolean {
        return this.accessibleColors;
    }
}
