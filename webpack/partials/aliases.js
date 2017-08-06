"use strict";
exports.__esModule = true;
var path = require("path");
exports.partial = function (c) { return ({
    resolve: {
        modules: ['node_modules', path.join(c.rootDir, 'src')],
        /**
         * Though the project's source is in Typescript, we must support Javascript
         * resolution as well, because some node_modules import JS files.
         */
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '~': path.resolve('./src')
        }
    }
}); };
