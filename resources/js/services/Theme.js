export default class {
    static get availableThemes() {
        return [
            'light',
            'dark',
            'unicorn',
            'rainbow',
            'night',
            'ocean',
            'forest',
            'desert',
            'original',
        ];
    }

    constructor(storage, bodyClassList) {
        this.storage = storage;
        this.bodyClassList = bodyClassList;

        const theme = this.storage.get('theme');
        if (theme !== 'light') {
            this.updateDOM('light', theme);
        }
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
