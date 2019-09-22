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
require('laravel-mix-purgecss');

mix
    .extract(['vue', 'bootstrap-vue'])
    .js('resources/js/app.js', 'public/js')
    .js('resources/js/docs.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .sass('resources/sass/docs.scss', 'public/css')
    .webpackConfig(webpackConfig)
    .sourceMaps()
    .options({
        processCssUrls: false,
    });

if (mix.inProduction()) {
    mix.version();
}
