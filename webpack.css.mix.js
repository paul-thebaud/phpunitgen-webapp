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

mix
    .options({
        processCssUrls: false,
    })
    .sass("resources/scss/entries/vendor.scss", "public/css")
    .sass("resources/scss/entries/app.scss", "public/css")
    .sass("resources/scss/entries/docs.scss", "public/css");

if (mix.inProduction()) {
    mix.version();
} else {
    mix.sourceMaps();
}

mix.mergeManifest();
