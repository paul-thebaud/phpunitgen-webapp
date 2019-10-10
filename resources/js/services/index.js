import i18n from '@/i18n';
import Api from '@/services/Api';
import Storage from '@/services/Storage';
import Docs from '@/services/Docs';
import Locale from '@/services/Locale';
import Theme from '@/services/Theme';

const storage = new Storage(localStorage, navigator, window);
const theme = new Theme(storage, i18n, document.body.classList);
const locale = new Locale(storage, i18n);
const api = new Api(storage);
const docs = new Docs(storage, window);

export { api, storage, docs, theme, locale };
