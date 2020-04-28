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
require("laravel-mix-merge-manifest");
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
        "inversify",
        "reflect-metadata",
        "vue-property-decorator",
    ])
    .js("resources/ts/entries/app.ts", "public/js")
    .js("resources/ts/entries/docs.ts", "public/js");


if (mix.inProduction()) {
    mix.version();
} else {
    mix.sourceMaps();
}

mix.svgVue().mergeManifest();

mix.generateSW({
    runtimeCaching: [{
        // Match any request that ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:jpg|webp|mp4|woff2|jpeg|png|gif|ico|css|js)$/,

        // Apply a cache-first strategy.
        handler: 'NetworkFirst',
    }],

    skipWaiting: true
});
