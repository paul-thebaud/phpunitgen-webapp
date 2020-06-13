/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

const mix = require("laravel-mix");
require("laravel-mix-svg-vue");
require("laravel-mix-workbox");
const webpackConfig = require("./webpack.config");

mix.webpackConfig(webpackConfig)
    .babelConfig({
        plugins: ["@babel/plugin-syntax-dynamic-import"],
    })
    .options({
        postCss: [require("autoprefixer")],
    })
    .extract([
        "vue",
        "vue-i18n",
        "vue-gtag",
        "popper.js",
        "vuex",
        "inversify",
        "reflect-metadata",
        "vue-property-decorator",
        "vue-class-component",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/vue-fontawesome",
    ])
    .js("resources/ts/entries/app.ts", "public/js")
    .js("resources/ts/entries/docs.ts", "public/js");

if (! mix.inProduction()) {
    mix.sourceMaps();
}

mix.svgVue();

mix.injectManifest({
    swSrc: "./resources/ts/service-worker/service-worker.js",
});
