import i18n from '@/i18n';
import ConfigManager from '@/services/ConfigManager';
import ThemeManager from '@/services/ThemeManager';
import LocaleManager from '@/services/LocaleManager';
import ApiManager from '@/services/ApiManager';

const configManager = new ConfigManager(localStorage);
const themeManager = new ThemeManager(configManager, document.body.classList);
const localeManager = new LocaleManager(configManager, i18n);
const apiManager = new ApiManager(configManager);

export { configManager, themeManager, localeManager, apiManager };
