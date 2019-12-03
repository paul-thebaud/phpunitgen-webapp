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
     * Theme constructor.
     *
     * @param {string} key
     * @param {string} emoji
     * @param {string} codeMirror
     * @param {number} generationsToUnlock
     */
    public constructor(key: string, emoji: string, codeMirror: string, generationsToUnlock: number) {
        this.key = key;
        this.emoji = emoji;
        this.codeMirror = codeMirror;
        this.generationsToUnlock = generationsToUnlock;
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
}
