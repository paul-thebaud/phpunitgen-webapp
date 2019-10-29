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
    protected codeMirrorClass: string;

    /**
     * The number of generations needed to unlock the theme.
     */
    protected generationsToUnlock: number;

    /**
     * Theme constructor.
     *
     * @param {string} key
     * @param {string} emoji
     * @param {string} codeMirrorClass
     * @param {number} generationsToUnlock
     */
    public constructor(key: string, emoji: string, codeMirrorClass: string, generationsToUnlock: number) {
        this.key = key;
        this.emoji = emoji;
        this.codeMirrorClass = codeMirrorClass;
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
    public getCodeMirrorClass(): string {
        return this.codeMirrorClass;
    }

    /**
     * @returns {number}
     */
    public getGenerationsToUnlock(): number {
        return this.generationsToUnlock;
    }
}
