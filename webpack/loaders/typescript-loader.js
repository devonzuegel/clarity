"use strict";
exports.__esModule = true;
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
exports.partial = function () { return ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
        ]
    },
    plugins: [new CheckerPlugin()]
}); };
