import { SerializerI } from "@/container/contracts/serializerI";
import { StoreI, ToolType } from "@/container/contracts/storeI";
import { locales } from "@/container/implementations/i18nLocale";
import { TYPES } from "@/container/types";
import { inject, injectable } from "inversify";

/**
 * The type for the local storage content.
 */
type LocalStoreContent = {
    generationsCount: number;
    forceEditorTabs: boolean;
    lastEditorContent?: string | undefined;
    theme: string;
    locale: string;
    tool: ToolType;
};

/**
 * Class LocaleStore.
 *
 * Implementation of store using local storage of browser.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
@injectable()
export class LocalStore implements StoreI {
    /**
     * The window object to use for locale/color scheme/local storage usage.
     */
    protected window: Window;

    /**
     * The serializer to save/fetch storage.
     */
    protected serializer: SerializerI;

    /**
     * The key of content in storage.
     */
    protected localeStorageKey = "phpunitgen_store";

    /**
     * The synced content of storage.
     */
    protected content!: LocalStoreContent;

    /**
     * LocalStore constructor.
     *
     * @param {Window} window
     * @param {SerializerI} serializer
     */
    public constructor(
        @inject(TYPES.Window) window: Window,
        @inject(TYPES.Serializer) serializer: SerializerI,
    ) {
        this.window = window;
        this.serializer = serializer;

        try {
            this.fetch();
        } catch (error) {
            // We will use the default one, so save it.
            this.content = this.defaultContent();
            this.save();
        }
    }

    /**
     * @inheritDoc
     */
    public getTheme(): string {
        return this.content.theme;
    }

    /**
     * @inheritDoc
     */
    public setTheme(theme: string): StoreI {
        this.content.theme = theme;

        return this;
    }

    /**
     * @inheritDoc
     */
    public getLocale(): string {
        return this.content.locale;
    }

    /**
     * @inheritDoc
     */
    public setLocale(locale: string): StoreI {
        this.content.locale = locale;

        return this;
    }

    /**
     * @inheritDoc
     */
    public getTool(): ToolType {
        return this.content.tool;
    }

    /**
     * @inheritDoc
     */
    public setTool(tool: ToolType): StoreI {
        this.content.tool = tool;

        return this;
    }

    /**
     * @inheritDoc
     */
    public getGenerationsCount(): number {
        return this.content.generationsCount;
    }

    /**
     * @inheritDoc
     */
    public incrementGenerationsCount(): StoreI {
        this.content.generationsCount++;

        return this;
    }

    /**
     * @inheritDoc
     */
    public getForceEditorTabs(): boolean {
        return this.content.forceEditorTabs;
    }

    /**
     * @inheritDoc
     */
    public setForceEditorTabs(forceEditorTabs: boolean): StoreI {
        this.content.forceEditorTabs = forceEditorTabs;

        return this;
    }

    /**
     * @inheritDoc
     */
    public getLastEditorContent(): string | undefined {
        return this.content.lastEditorContent;
    }

    /**
     * @inheritDoc
     */
    public setLastEditorContent(content: string | undefined): StoreI {
        this.content.lastEditorContent = content;

        return this;
    }

    /**
     * @inheritDoc
     */
    public fetch(): StoreI {
        const existing = this.window.localStorage.getItem(this.localeStorageKey);
        if (existing === null) {
            throw new Error("storage does not contain a save");
        }

        this.content = this.serializer.deserialize(existing) as LocalStoreContent;

        return this;
    }

    /**
     * @inheritDoc
     */
    public save(): StoreI {
        this.window.localStorage.setItem(
            this.localeStorageKey,
            this.serializer.serialize(this.content),
        );

        return this;
    }

    /**
     * Get the default store content when none is present.
     *
     * @returns {LocalStoreContent}
     */
    protected defaultContent(): LocalStoreContent {
        return {
            generationsCount: 0,
            forceEditorTabs: false,
            theme: this.defaultTheme(),
            locale: this.defaultLocale(),
            tool: {
                automaticGeneration: true,
                testGenerator: "delegate",
                mockGenerator: "mockery",
                baseNamespace: "App",
                baseTestNamespace: "Tests",
                testCase: "Tests\\TestCase",
                testClassFinal: true,
                testClassStrictTypes: false,
                testClassTypedProperties: true,
                excludedMethods: [
                    "__construct",
                    "__destruct",
                ],
                mergedPhpDoc: [
                    "author",
                    "copyright",
                    "license",
                    "version",
                ],
                phpDoc: [],
                options: {
                    context: "laravel",
                    "laravel.user": "App\\User",
                },
            },
        };
    }

    /**
     * Get the default theme to use based on system's preferred color scheme.
     *
     * @returns {string}
     */
    protected defaultTheme(): string {
        const { matches: isDarkMode } = this.window.matchMedia("(prefers-color-scheme: dark)");

        return isDarkMode ? "dark" : "light";
    }

    /**
     * Get the default locale to use based on navigator's locale.
     *
     * @returns {string}
     */
    protected defaultLocale(): string {
        let defaultLocale = "en";

        (this.window.navigator.languages || []).some((language) => {
            if (Object.keys(locales).indexOf(language) !== -1) {
                defaultLocale = language;

                return true;
            }

            return false;
        });

        return defaultLocale;
    }
}
