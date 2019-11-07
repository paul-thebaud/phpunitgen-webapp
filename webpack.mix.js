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

const mix = require('laravel-mix');
const webpackConfig = require('./webpack.config');

mix.webpackConfig(webpackConfig)
    .options({
        processCssUrls: false,
    })
    .extract([
        'vue',
        'vue-i18n',
    ])
    //.js('resources/js/app.js', 'public/js')
    //.js('resources/js/docs.js', 'public/js')
    .js('resources/ts/entries/app.ts', 'public/js')
    //.js('resources/ts/docs.js', 'public/js')
    .sass('resources/scss/entries/app.scss', 'public/css');
    //.sass('resources/sass/docs.scss', 'public/css');

if (mix.inProduction()) {
    mix.version();
} else {
    mix.sourceMaps();
}
