window.$docsify = {
    el: "#docs",
    name: "PhpUnitGen",
    loadSidebar: "_sidebar.md",
    subMaxLevel: 3,
    basePath: "/docs",
    auto2top: true,
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
};
