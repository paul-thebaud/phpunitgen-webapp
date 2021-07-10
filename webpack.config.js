/*
 |--------------------------------------------------------------------------
 | Webpack configuration
 |--------------------------------------------------------------------------
 |
 | This file is separated from the Mix configuration to have IDE
 | auto-completion on JS files.
 |
 */

const path = require("path");
const ChunkRenamePlugin = require("webpack-chunk-rename-plugin");
const { DefinePlugin } = require("webpack");

const plugins = [
    new ChunkRenamePlugin({
        initialChunksWithEntry: true,
        "/js/vendor": "/js/vendor.js",
    }),
];
if (process.env.ANALYZE === "true") {
    const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

    plugins.push(new BundleAnalyzerPlugin());
}

let chunkFilename;
if (process.env.NODE_ENV === "production") {
    chunkFilename = "js/chunks/[name].[chunkhash].js";
} else {
    chunkFilename = "js/chunks/[name].js";
}

const buildDateTime = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "").replace(/:[0-9]{2}$/, "");

plugins.push(new DefinePlugin({
    "process.env.BUILD_DATETIME": JSON.stringify(buildDateTime),
}))

module.exports = {
    output: {
        publicPath: "",
        filename: "[name].js",
        chunkFilename: chunkFilename,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: { appendTsSuffixTo: [/\.vue$/] },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx", ".scss"],
        alias: {
            "@": path.resolve(__dirname, "./resources/ts"),
            "@scss": path.resolve(__dirname, "./resources/scss"),
        },
    },
    plugins,
};
