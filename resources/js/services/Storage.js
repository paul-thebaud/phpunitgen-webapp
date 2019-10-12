import LocaleManager from '@/services/Locale';

const STORAGE_KEY = 'phpunitgen_storage';

export default class {
    static defaultStorage(navigator, window) {
        return {
            generationsCount: 0,
            theme: this.defaultTheme(window),
            locale: this.defaultLocale(navigator),
            tool: {
                automatic_generation: true,
                test_generator: 'delegate',
                mock_generator: 'mockery',
                base_namespace: '',
                base_test_namespace: 'Tests',
                test_case: 'PHPUnit\\Framework\\TestCase',
                excluded_methods: [
                    '__construct',
                    '__destruct',
                ],
                merged_php_doc: [
                    'author',
                    'copyright',
                    'license',
                    'version',
                ],
                php_doc: [],
                options: {
                    context: 'laravel',
                    'laravel.user': 'App\\User',
                },
            },
        };
    }

    static defaultTheme(window) {
        const { matches: isDarkMode } = window.matchMedia('(prefers-color-scheme: dark)');

        return isDarkMode ? 'dark' : 'light';
    }

    static defaultLocale(navigator) {
        const locales = Object.keys(LocaleManager.availableLocales);
        let locale = 'en';

        (navigator.languages || []).some((language) => {
            if (locales.includes(language)) {
                locale = language;

                return true;
            }

            return false;
        });

        return locale;
    }

    /**
     * Config constructor.
     *
     * @param {Storage} storage
     * @param {Navigator} navigator
     * @param {Window} window
     */
    constructor(storage, navigator, window) {
        this.storage = storage;

        const storageConfig = this.storage.getItem(STORAGE_KEY);
        if (storageConfig !== null) {
            this.config = JSON.parse(storageConfig);
        } else {
            this.config = this.constructor.defaultStorage(navigator, window);
            this.save();
        }
    }

    /**
     * Save the configuration in storage.
     */
    save() {
        this.storage.setItem(STORAGE_KEY, JSON.stringify(this.config));
    }

    /**
     * Set a configuration value.
     *
     * @param {String} key
     * @param {*} value
     */
    set(key, value) {
        this.config[key] = value;

        this.save();
    }

    /**
     * Get a configuration value.
     *
     * @param {String} key
     * @param {*} defaultValue
     */
    get(key, defaultValue = null) {
        return this.config[key] || null;
    }
}
