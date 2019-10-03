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
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            '@sass': path.resolve(__dirname, './resources/sass'),
        },
    },
};
