export default class {
    get availableThemes() {
        return {
            light: 'Light',
            dark: 'Dark',
        };
    }

    constructor(configManager, bodyClassList) {
        this.configManager = configManager;
        this.bodyClassList = bodyClassList;

        const theme = this.configManager.get('theme');
        if (theme !== 'light') {
            this.updateDOM('light', theme);
        }
    }

    changeTheme(theme) {
        const previous = this.configManager.get('theme');
        this.configManager.set('theme', theme);
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
