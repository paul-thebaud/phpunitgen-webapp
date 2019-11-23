import "@/entries/bootstrap";
import "@/docs";
import "docsify";
import "docsify/lib/plugins/external-script";
import "docsify/lib/plugins/search";
import "docsify-copy-code";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-php";
import "prismjs/components/prism-json";
import Vue, { VNode } from "vue";
import VueI18n from "vue-i18n";
import { container } from "@/container/docContainer";
import { TYPES } from "@/container/types";
import { ThemeI } from "@/container/contracts/themeI";
import { LocaleI } from "@/container/contracts/localeI";
import DocsNav from "@/components/docs/DocsNav.vue";

new Vue({
    el: "#docs-nav",
    i18n: container.get<VueI18n>(TYPES.VueI18n),
    render: (h): VNode => h(DocsNav),
    provide: {
        [TYPES.Locale]: container.get<LocaleI>(TYPES.Locale),
        [TYPES.Theme]: container.get<ThemeI>(TYPES.Theme),
    },
});

const locale = container.get<LocaleI>(TYPES.Locale);
if (! window.location.hash.match(`/^#/${locale.currentLocale}//`)) {

    window.location.hash = window.location.hash.replace(/^(#(\/([a-z]{2}\/?)?)?)?/, `#${locale.currentLocale}/`);
}
