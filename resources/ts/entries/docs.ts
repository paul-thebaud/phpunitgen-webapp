import "@scss/entries/docs";
import "@/entries/bootstrap";
import "@/docs";
import "docsify";
import "docsify/lib/plugins/external-script";
import "docsify/lib/plugins/ga";
import "docsify/lib/plugins/search";
import "docsify-copy-code";
import "docsify-pagination";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-php";
import "prismjs/components/prism-json";
import Vue, { VNode } from "vue";
import VueI18n from "vue-i18n";
import { container } from "@/container/docContainer";
import { TYPES } from "@/container/types";
import { LocaleI } from "@/container/contracts/localeI";
import store from "@/store";
import DocsNav from "@/components/docs/DocsNav.vue";
import PhpUnitGenLogoLink from "@/components/common/PhpUnitGenLogoLink.vue";

new Vue({
    el: "#docs-nav",
    i18n: container.get<VueI18n>(TYPES.VueI18n),
    store,
    render: (h): VNode => h(DocsNav),
    provide: {
        [TYPES.Locale]: container.get<LocaleI>(TYPES.Locale),
    },
});

const locale = container.get<LocaleI>(TYPES.Locale);
if (! window.location.hash.match(`/^#/${locale.currentLocale}//`)) {

    window.location.hash = window.location.hash.replace(/^(#(\/([a-z]{2}\/?)?)?)?/, `#${locale.currentLocale}/`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).$docsify.plugins.push(function (hook: { ready: Function }): void {
    hook.ready(function (): void {
        (new PhpUnitGenLogoLink).$mount(".app-name-link");
    });
});
