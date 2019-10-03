const STORAGE_CONFIG_KEY = 'phpunitgen_configuration';
const DEFAULT_CONFIG = {
    theme: 'light',
    locale: 'en',
    tool: {
        test_generator: 'delegate',
        mock_generator: 'mockery',
    },
};

export default class {
    /**
     * Config constructor.
     *
     * @param {Storage} storage
     */
    constructor(storage) {
        this.storage = storage;

        const storageConfig = this.storage.getItem(STORAGE_CONFIG_KEY);
        if (storageConfig !== null) {
            this.config = JSON.parse(storageConfig);
        } else {
            this.config = DEFAULT_CONFIG;
        }
    }

    /**
     * Save the configuration in storage.
     */
    save() {
        this.storage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(this.config));
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
