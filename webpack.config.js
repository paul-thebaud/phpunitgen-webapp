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

const plugins = [
    new ChunkRenamePlugin({
        initialChunksWithEntry: true,
        "/js/vendor": "/js/vendor.js",
    }),
];
if (process.env.NODE_ENV === "analyse") {
    const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

    plugins.push(new BundleAnalyzerPlugin());
}

let chunkFilename;
if (process.env.NODE_ENV === "production") {
    chunkFilename = "js/chunks/[name].[chunkhash].js";
} else {
    chunkFilename = "js/chunks/[name].js";
}


module.exports = {
    output: {
        publicPath: "/",
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
        extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx"],
        alias: {
            "@": path.resolve(__dirname, "./resources/ts"),
        },
    },
    plugins,
};
