"use strict";
exports.__esModule = true;
var webpackMerge = require("webpack-merge");
var path = require("path");
var Env = require("../models/Environment");
exports.setup = function (env) {
    var isProd = String(env) === String(Env.Enum.production);
    var options = {
        rootDir: path.join(__dirname, '../..'),
        outputDir: isProd ? 'dist' : 'build',
        devtool: 'source-map',
        console: !isProd,
        isProd: isProd
    };
    return webpackMerge([
        require('../loaders/typescript-loader'),
        require('./partials/base'),
        require('./partials/externals'),
        require('./partials/plugins'),
        require('./partials/node'),
        require('../partials/aliases'),
    ].map(function (m) { return m.partial(options); }));
};
