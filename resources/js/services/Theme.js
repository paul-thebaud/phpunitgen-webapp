export default {
    theme: 'light',

    availableThemes() {
        return {
            light: 'Light',
            dark: 'Dark',
        };
    },

    initTheme() {
        this.theme = localStorage.getItem('pug_theme') || 'light';

        if (this.theme !== 'light') {
            this.updateDOM('light', this.theme);
        }
    },

    setTheme(theme) {
        localStorage.setItem('pug_theme', theme);
        this.updateDOM(this.theme, theme);
        this.theme = theme;
    },

    getTheme() {
        return this.theme;
    },

    updateDOM(previousTheme, newTheme) {
        const classList = document.body.classList;

        classList.add('theme-switching');
        classList.add(`theme-${newTheme}`);
        classList.remove(`theme-${previousTheme}`);

        setTimeout(() => {
            classList.remove(`theme-switching`);
        }, 500);
    },
};
