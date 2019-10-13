export default class {
    static get themes() {
        return {
            'light': 0,
            'dark': 0,
            'night': 1,
            'forest': 3,
            'ocean': 5,
            'desert': 7,
            'rainbow': 9,
            'unicorn': 12,
            'original': 15,
        };
    }

    static get icons() {
        return {
            'light': '💡',
            'dark': '🕶️',
            'night': '🌙',
            'forest': '🌳',
            'ocean': '🌊',
            'desert': '🏜️',
            'rainbow': '🌈',
            'unicorn': '🦄',
            'original': '📟',
        };
    }

    constructor(storage, i18n, bodyClassList) {
        this.storage = storage;
        this.i18n = i18n;
        this.bodyClassList = bodyClassList;

        const theme = this.storage.get('theme');
        if (theme !== 'light') {
            this.updateDOM('light', theme);
        }
    }

    icon(theme) {
        return this.constructor.icons[theme];
    }

    nextThemeUnlock() {
        const generationsCount = this.storage.get('generationsCount');

        const themes = this.constructor.themes;
        for (const theme in themes) {
            if (generationsCount < themes[theme]) {
                return theme;
            }
        }

        return null;
    }

    nextThemeUnlockAt() {
        const generationsCount = this.storage.get('generationsCount');

        const themes = this.constructor.themes;
        for (const theme in themes) {
            if (generationsCount < themes[theme]) {
                return themes[theme];
            }
        }

        return null;
    }

    unlockedThemes() {
        const generationsCount = this.storage.get('generationsCount');

        const availableThemes = [];
        const themes = this.constructor.themes;
        for (const theme in themes) {
            if (generationsCount >= themes[theme]) {
                availableThemes.push(theme);
            }
        }

        return availableThemes;
    }

    changeTheme(theme) {
        const previous = this.storage.get('theme');
        this.storage.set('theme', theme);
        this.updateDOM(previous, theme);
    }

    updateDOM(previousTheme, newTheme) {
        this.bodyClassList.add('theme-switching');
        this.bodyClassList.add(`theme-${newTheme}`);
        this.bodyClassList.remove(`theme-${previousTheme}`);

        setTimeout(() => {
            this.bodyClassList.remove(`theme-switching`);
        }, 500);
    }
}
