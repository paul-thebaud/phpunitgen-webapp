import VueI18n from "vue-i18n";
import { Container } from "inversify";
import { en, fr } from "@/lang";
import { LocaleI } from "@/container/contracts/localeI";
import { ThemeI } from "@/container/contracts/themeI";
import { DomTheme } from "@/container/implementations/domTheme";
import { I18nLocale } from "@/container/implementations/i18nLocale";
import { TYPES } from "@/container/types";
import { SerializerI } from "@/container/contracts/serializerI";
import { JsonSerializer } from "@/container/implementations/jsonSerializer";
import { StoreI } from "@/container/contracts/storeI";
import { LocalStore } from "@/container/implementations/localStore";
import { GoogleAnalyticsI } from "@/container/contracts/googleAnalyticsI";
import { GoogleAnalytics } from "@/container/implementations/googleAnalytics";

const container: Container = new Container();

container.bind<Window>(TYPES.Window)
    .toConstantValue(window);
container.bind<VueI18n>(TYPES.VueI18n)
    .toConstantValue(new VueI18n({
        locale: "en",
        messages: { en, fr },
    }));

container.bind<GoogleAnalyticsI>(TYPES.GoogleAnalytics)
    .to(GoogleAnalytics)
    .inSingletonScope();
container.bind<SerializerI>(TYPES.Serializer)
    .to(JsonSerializer)
    .inSingletonScope();
container.bind<StoreI>(TYPES.Store)
    .to(LocalStore)
    .inSingletonScope();
container.bind<ThemeI>(TYPES.Theme)
    .to(DomTheme)
    .inSingletonScope();
container.bind<LocaleI>(TYPES.Locale)
    .to(I18nLocale)
    .inSingletonScope();

export { container };
