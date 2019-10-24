export default class {
    static get themes() {
        return {
            'light': 0,
            'dark': 0,
            'night': 2,
            'forest': 5,
            'ocean': 10,
            'desert': 15,
            'rainbow': 20,
            'unicorn': 25,
            'original': 30,
        };
    }

    static get codeMirrorThemes() {
        return {
            'light': 'default',
            'dark': 'darcula',
            'night': 'erlang-dark',
            'forest': 'blackboard',
            'ocean': 'tomorrow-night-eighties',
            'desert': 'pastel-on-dark',
            'rainbow': 'default',
            'unicorn': 'darcula',
            'original': 'default',
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
        const codeMirror = document.querySelector('.CodeMirror');
        if (codeMirror) {
            const previousCodeMirror = this.constructor.codeMirrorThemes[previousTheme];
            const newCodeMirror = this.constructor.codeMirrorThemes[newTheme];
            if (previousCodeMirror !== newCodeMirror) {
                codeMirror.classList.add(`cm-s-${newCodeMirror}`);
                codeMirror.classList.remove(`cm-s-${previousCodeMirror}`);
            }
        }
        console.log(document.querySelector('.CodeMirror'));
        this.bodyClassList.remove(`theme-${previousTheme}`);

        setTimeout(() => {
            this.bodyClassList.remove(`theme-switching`);
        }, 500);
    }
}
