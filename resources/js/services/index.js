import i18n from '@/i18n';
import ApiManager from '@/services/ApiManager';
import ConfigManager from '@/services/ConfigManager';
import DocsManager from '@/services/DocsManager';
import LocaleManager from '@/services/LocaleManager';
import ThemeManager from '@/services/ThemeManager';

const configManager = new ConfigManager(localStorage);
const themeManager = new ThemeManager(configManager, document.body.classList);
const localeManager = new LocaleManager(configManager, i18n);
const apiManager = new ApiManager(configManager);
const docsManager = new DocsManager(configManager, localeManager, window);

export { apiManager, configManager, docsManager, themeManager, localeManager };
