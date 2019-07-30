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
const tailwindcss = require('tailwindcss');
const webpackConfig = require('./webpack.config');

mix
    .js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .webpackConfig(webpackConfig)
    .options({
        processCssUrls: false,
        postCss: [tailwindcss('./tailwind.js')],
    });

if (mix.inProduction()) {
    mix.sourceMaps().version();
}
