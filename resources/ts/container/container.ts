import VueRouter, { RouterOptions } from "vue-router";
import { routes, scrollBehavior } from "@/router";
import { ApiClientI } from "@/container/contracts/apiClientI";
import { ApiClient } from "@/container/implementations/apiClient";
import { TYPES } from "@/container/types";
import { TestResourceI } from "@/container/contracts/testResourceI";
import { TestResource } from "@/container/implementations/testResource";
import { TestGeneratorResourceI } from "@/container/contracts/testGeneratorResourceI";
import { TestGeneratorResource } from "@/container/implementations/testGeneratorResource";
import { MockGeneratorResourceI } from "@/container/contracts/mockGeneratorResourceI";
import { MockGeneratorResource } from "@/container/implementations/mockGeneratorResource";
import { container } from "@/container/docContainer";

container.bind<VueRouter>(TYPES.VueRouter)
    .toConstantValue(new VueRouter({
        mode: "history",
        scrollBehavior,
        routes,
    } as RouterOptions));

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
