import { container } from "@/container/docContainer";
import { TYPES } from "@/container/types";

const googleAnalytics = container.get(TYPES.GoogleAnalytics);

const docsify = {
    el: "#docs",
    name: "PhpUnitGen",
    loadSidebar: "_sidebar.md",
    subMaxLevel: 3,
    basePath: "/docs-content",
    auto2top: true,
    externalLinkTarget: '_self',
    noCompileLinks: [
        "/",
        "/tool",
    ],
    search: {
        hideOtherSidebarContent: true,
        noData: {
            "/fr/": "Aucun résultat !",
            "/en/": "No results!",
        },
        paths: "auto",
        placeholder: {
            "/fr/": "Recherche...",
            "/en/": "Search...",
        },
    },
    pagination: {
        previousText: "Previous",
        nextText: "Next",
    },
};

if (googleAnalytics.isConfigured() && googleAnalytics.isAccepted()) {
    docsify.ga = googleAnalytics.getApplicationId();
}

window.$docsify = docsify;
