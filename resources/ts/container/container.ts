import VueI18n from "vue-i18n";
import VueRouter from "vue-router";
import { Container } from "inversify";
import { LocaleI } from "@/container/contracts/localeI";
import { SerializerI } from "@/container/contracts/serializerI";
import { StoreI } from "@/container/contracts/storeI";
import { ThemeI } from "@/container/contracts/themeI";
import { ApiClientI } from "@/container/contracts/apiClientI";
import { DomTheme } from "@/container/implementations/domTheme";
import { I18nLocale } from "@/container/implementations/i18nLocale";
import { LocalStore } from "@/container/implementations/localStore";
import { JsonSerializer } from "@/container/implementations/jsonSerializer";
import { ApiClient } from "@/container/implementations/apiClient";
import { TYPES } from "@/container/types";
import { en, fr } from "@/lang";
import { routes, scrollBehavior } from "@/routes";
import { TestResourceI } from "@/container/contracts/testResourceI";
import { TestResource } from "@/container/implementations/testResource";
import { TestGeneratorResourceI } from "@/container/contracts/testGeneratorResourceI";
import { TestGeneratorResource } from "@/container/implementations/testGeneratorResource";
import { MockGeneratorResourceI } from "@/container/contracts/mockGeneratorResourceI";
import { MockGeneratorResource } from "@/container/implementations/mockGeneratorResource";

const container: Container = new Container();

container.bind<Window>(TYPES.Window)
    .toConstantValue(window);
container.bind<VueI18n>(TYPES.VueI18n)
    .toConstantValue(new VueI18n({
        locale: "en",
        messages: { en, fr },
    }));
container.bind<VueRouter>(TYPES.VueRouter)
    .toConstantValue(new VueRouter({
        mode: "history",
        scrollBehavior,
        routes,
    }));

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
container.bind<ApiClientI>(TYPES.ApiClient)
    .to(ApiClient)
    .inSingletonScope();
container.bind<TestResourceI>(TYPES.TestResource)
    .to(TestResource)
    .inSingletonScope();
container.bind<TestGeneratorResourceI>(TYPES.TestGeneratorResource)
    .to(TestGeneratorResource)
    .inSingletonScope();
container.bind<MockGeneratorResourceI>(TYPES.MockGeneratorResource)
    .to(MockGeneratorResource)
    .inSingletonScope();

export { container };
