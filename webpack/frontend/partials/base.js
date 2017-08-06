"use strict";
exports.__esModule = true;
var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var entryFile = './src/frontend/main.tsx';
exports.partial = function (c) { return ({
    entry: c.isProd
        ? entryFile
        : {
            app: ['webpack-hot-middleware/client?reload=true', entryFile]
        },
    output: {
        path: path.join(c.rootDir, c.outputDir),
        filename: 'frontend.js',
        publicPath: '/'
    },
    devtool: c.devtool,
    plugins: (c.isProd ? [] : [new webpack.HotModuleReplacementPlugin()]).concat([
        new HtmlWebpackPlugin({ template: './src/frontend/index.html' }),
    ])
}); };
