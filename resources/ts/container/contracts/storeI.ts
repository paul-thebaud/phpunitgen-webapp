/**
 * The type for the tool configuration.
 */
export type ToolType = {
    automaticGeneration: boolean,
    testGenerator: string,
    mockGenerator: string,
    baseNamespace: string,
    baseTestNamespace: string,
    testCase: string,
    excludedMethods: string[],
    mergedPhpDoc: string[],
    phpDoc: string[],
    options: {
        context: string | null,
        "laravel.user": string | null,
    },
}

/**
 * Interface StoreI.
 *
 * The store used to save tool configuration, theme and locale.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
export interface StoreI {
    /**
     * Retrieve the current theme as string.
     *
     * @returns {string}
     */
    getTheme(): string;

    /**
     * Define the current theme.
     *
     * @param {string} theme
     *
     * @returns {Store}
     */
    setTheme(theme: string): StoreI;

    /**
     * Retrieve the current locale as string.
     *
     * @returns {string}
     */
    getLocale(): string;

    /**
     * Define the current locale.
     *
     * @param {string} locale
     *
     * @returns {Store}
     */
    setLocale(locale: string): StoreI;

    /**
     * Retrieve the current tool configuration.
     *
     * @returns {string}
     */
    getTool(): ToolType;

    /**
     * Define the current tool configuration.
     *
     * @param {ToolType} tool
     *
     * @returns {Store}
     */
    setTool(tool: ToolType): StoreI;

    /**
     * Retrieve the current generations count.
     *
     * @returns {string}
     */
    getGenerationsCount(): number;

    /**
     * Increment the current generations count.
     *
     * @returns {string}
     */
    incrementGenerationsCount(): StoreI;

    /**
     * Check if the tabs display should be forced even if the user is on a wide screen.
     *
     * @returns {boolean}
     */
    getForceEditorTabs(): boolean;

    /**
     * Check if the tabs display should be forced even if the user is on a wide screen.
     *
     * @param {boolean} forceEditorTabs
     */
    setForceEditorTabs(forceEditorTabs: boolean): StoreI;

    /**
     * Retrieve the last editor content if exists.
     *
     * @returns {string | undefined}
     */
    getLastEditorContent(): string | undefined;

    /**
     * Set the last editor content (remove it if undefined).
     *
     * @param {string | undefined} content
     *
     * @returns {StoreI}
     */
    setLastEditorContent(content: string | undefined): StoreI;

    /**
     * Fetch the store content.
     *
     * @returns {Store}
     */
    fetch(): StoreI;

    /**
     * Save the store content.
     *
     * @returns {Store}
     */
    save(): StoreI;
}
