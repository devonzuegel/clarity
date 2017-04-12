require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var U = __webpack_require__(6);
exports.Enum = U.strEnum(['development', 'production']);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Chalk = __webpack_require__(12);
exports.runHotMiddleware = function (app) {
    var webpack = __webpack_require__(13);
    var webpackConfig = __webpack_require__(7).default;
    var webpackCompiler = webpack(webpackConfig);
    app.use(__webpack_require__(14)(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true },
        noInfo: true,
        hot: true,
        inline: true,
        lazy: false,
        historyApiFallback: true,
        quiet: true
    }));
    app.use(__webpack_require__(15)(webpackCompiler));
};
exports.listen = function (app, _a) {
    var host = _a.host,
        port = _a.port;
    console.info(Chalk.black.bgGreen("\n\nListening at http://" + host + ":" + port + "\n"));
    app.listen(port);
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
  port: process.env.PORT || 4000,
  host: process.env.HOST || 'localhost',
  env:  process.env.NODE_ENV || 'development',
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(4);
var middleware_1 = __webpack_require__(2);
var config = __webpack_require__(3);
var app = express();
if (config.env !== 'production') {
    middleware_1.runHotMiddleware(app);
}
app.use('/', express.static(__dirname));
app.get('*', function (_, res) {
    res.status(200).send(renderHTML());
});
middleware_1.listen(app, config);
function renderHTML() {
    var html = "\n    <div>\n      <div id=\"root\" />\n      <script src=\"/frontend.js\"></script>\n    </div>\n  ";
    return "<!doctype html> " + html;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
// Adopted from:
//   https://basarat.gitbooks.io/typescript/docs/types/literal-types.html
function strEnum(o) {
    return o.reduce(function (res, key) {
        res[key] = key;
        return res;
    }, Object.create(null));
}
exports.strEnum = strEnum;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Env = __webpack_require__(0);
var _1 = __webpack_require__(8);
exports.default = _1.setup(Env.Enum.development);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var webpackMerge = __webpack_require__(16);
var path = __webpack_require__(1);
var Env = __webpack_require__(0);
exports.setup = function (env) {
    var isProd = String(env) === String(Env.Enum.production);
    var options = {
        rootDir: path.join(__dirname, '../..'),
        outputDir: isProd ? 'dist' : 'build',
        devtool: 'source-map',
        console: !isProd
    };
    return webpackMerge([__webpack_require__(10), __webpack_require__(9)].map(function (m) {
        return m.partial(options);
    }));
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var path = __webpack_require__(1);
exports.partial = function (c) {
    return {
        entry: './src/frontend/main.tsx',
        output: {
            path: path.join(c.rootDir, c.outputDir),
            filename: 'frontend.js'
        },
        devtool: c.devtool
    };
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var CheckerPlugin = __webpack_require__(11).CheckerPlugin;
exports.partial = function () {
    return {
        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            }]
        },
        plugins: [new CheckerPlugin()]
    };
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("awesome-typescript-loader");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("webpack-merge");

/***/ })
/******/ ]);
//# sourceMappingURL=backend.js.map