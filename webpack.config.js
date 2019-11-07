/*
 |--------------------------------------------------------------------------
 | Webpack configuration
 |--------------------------------------------------------------------------
 |
 | This file is separated from the Mix configuration to have IDE
 | auto-completion on JS files.
 |
 */

const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.vue', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, './resources/ts'),
            '@sass': path.resolve(__dirname, './resources/sass'),
            '@scss': path.resolve(__dirname, './resources/scss'),
        },
    },
};
