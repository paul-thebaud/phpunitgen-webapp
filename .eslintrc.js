module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/recommended",
        "@vue/typescript",
    ],
    plugins: [
        "@typescript-eslint",
        "vue",
    ],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    },
    "overrides": [
        {
            "files": [
                "resources/ts/**/*.js",
                "resources/ts/**/*.ts",
                "resources/ts/**/*.vue",
            ],
            "rules": {
                "vue/no-v-html": ["off"],
                "@typescript-eslint/explicit-member-accessibility": ["error"],
                "@typescript-eslint/no-unused-vars": ["warn", {
                    "varsIgnorePattern": "Model",
                }],
            },
        },
    ],
};
