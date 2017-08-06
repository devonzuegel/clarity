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
    var shared = [
        require('../loaders/css-loader'),
        require('./partials/base'),
        require('../partials/aliases'),
    ];
    var partials = isProd
        ? [require('../loaders/typescript-loader')].concat(shared) : [require('../loaders/hot-typescript-loader')].concat(shared);
    return webpackMerge(partials.map(function (m) { return m.partial(options); }));
};
