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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var cls = __webpack_require__(22);
var Sequelize = __webpack_require__(4);
var user_1 = __webpack_require__(12);
var config_1 = __webpack_require__(10);
var database_url = __webpack_require__(2).database_url;
var Database = function () {
    function Database() {
        var _this = this;
        this.getModels = function () {
            return _this.models;
        };
        this.getSequelize = function () {
            return _this.sequelize;
        };
        Sequelize.cls = cls.createNamespace('sequelize-transaction');
        if (database_url) {
            this.sequelize = new Sequelize(database_url);
        } else {
            this.sequelize = new Sequelize(config_1.default.database, config_1.default.username, config_1.default.password, config_1.default);
        }
        this.models = {
            User: user_1.default(this.sequelize)
        };
    }
    return Database;
}();
var database = new Database();
exports.models = database.getModels();
exports.sequelize = database.getSequelize();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  port: process.env.PORT || 4000,
  host: process.env.HOST || 'localhost',
  env:  process.env.NODE_ENV || 'development',
  database_url: process.env.DATABASE_URL,
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var U = __webpack_require__(14);
exports.Enum = U.strEnum(['development', 'production']);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __webpack_require__(13);
var jsonError = function (res) {
    return function (reason) {
        return res.status(400).json(reason);
    };
};
exports.default = function (app) {
    app.get('/data', function (_, res) {
        res.status(200).json([1, 2, 3]);
    });
    app.get('/users', function (_, res) {
        user_1.userService.all().then(function (users) {
            return res.status(200).json(users);
        }).catch(jsonError(res));
    });
    app.get('/users/create', function (req, res) {
        user_1.userService.create({ username: req.query.username }).then(function (user) {
            return res.status(200).json(user);
        }).catch(jsonError(res));
    });
    return app;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Chalk = __webpack_require__(21);
exports.runHotMiddleware = function (app) {
    var webpack = __webpack_require__(24);
    var webpackConfig = __webpack_require__(15).default;
    var webpackCompiler = webpack(webpackConfig);
    app.use(__webpack_require__(25)(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true },
        noInfo: true,
        hot: true,
        inline: true,
        lazy: false,
        historyApiFallback: true,
        quiet: true
    }));
    app.use(__webpack_require__(26)(webpackCompiler));
};
exports.listen = function (app, _a) {
    var host = _a.host,
        port = _a.port;
    console.info(Chalk.black.bgGreen("\n\nListening at http://" + host + ":" + port + "\n"));
    app.listen(port);
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    username: 'devonzuegel',
    password: 'password',
    database: 'clarity_test',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    timezone: '+00:00'
};
exports.default = config;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(7);
var middleware_1 = __webpack_require__(6);
var api_1 = __webpack_require__(5);
var db_1 = __webpack_require__(1);
var fs = __webpack_require__(8);
var path = __webpack_require__(0);
var config = __webpack_require__(2);
var app = express();
app.use(__webpack_require__(9)());
if (config.env !== 'production') {
    middleware_1.runHotMiddleware(app);
}
app.use('/', express.static(__dirname));
api_1.default(app);
app.get('*', function (_, res) {
    var file = path.join("dist", 'index.html'); // TODO: Replace with raw-loader require
    var html = fs.readFileSync(file).toString();
    res.status(200).send(html);
});
db_1.sequelize.sync().then(function () {
    return middleware_1.listen(app, config);
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var SequelizeStatic = __webpack_require__(4);
exports.default = function (sequelize) {
    var Schema = {
        username: { type: SequelizeStatic.STRING, allowNull: false, primaryKey: true }
    };
    var Options = {
        indexes: [],
        classMethods: {},
        timestamps: false,
        freezeTableName: true
    };
    return sequelize.define('User', Schema, Options);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __webpack_require__(1);
var failure = function (reject) {
    return function (error) {
        console.error(error); // Log full error
        reject(error.errors); // Return only the descriptive .errors array
    };
};
var UserService = function () {
    function UserService() {
        this.create = function (attributes) {
            return new Promise(function (resolve, reject) {
                return db_1.models.User.create(attributes).then(function (user) {
                    return resolve(user);
                }).catch(failure(reject));
            });
        };
        this.all = function () {
            return new Promise(function (resolve, reject) {
                return db_1.models.User.findAll().then(function (products) {
                    return resolve(products);
                }).catch(failure(reject));
            });
        };
    }
    return UserService;
}();
exports.UserService = UserService;
exports.userService = new UserService();

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Env = __webpack_require__(3);
var _1 = __webpack_require__(16);
exports.default = _1.setup(Env.Enum.development);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var webpackMerge = __webpack_require__(27);
var path = __webpack_require__(0);
var Env = __webpack_require__(3);
exports.setup = function (env) {
    var isProd = String(env) === String(Env.Enum.production);
    var options = {
        rootDir: path.join(__dirname, '../..'),
        outputDir: isProd ? 'dist' : 'build',
        devtool: 'source-map',
        console: !isProd
    };
    return webpackMerge([__webpack_require__(18), __webpack_require__(17), __webpack_require__(19)].map(function (m) {
        return m.partial(options);
    }));
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var path = __webpack_require__(0);
var HtmlWebpackPlugin = __webpack_require__(23);
exports.partial = function (c) {
    return {
        entry: './src/frontend/main.tsx',
        output: {
            path: path.join(c.rootDir, c.outputDir),
            filename: 'frontend.js',
            publicPath: '/'
        },
        devtool: c.devtool,
        plugins: [new HtmlWebpackPlugin({ template: './src/frontend/index.html' })]
    };
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var CheckerPlugin = __webpack_require__(20).CheckerPlugin;
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var path = __webpack_require__(0);
exports.partial = function (c) {
    return {
        resolve: {
            modules: ['node_modules', path.join(c.rootDir, 'src')],
            /**
             * Though the project's source is in Typescript, we must support Javascript
             * resolution as well, because some node_modules import JS files.
             */
            extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
            alias: {
                '~': path.resolve('./src')
            }
        }
    };
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("awesome-typescript-loader");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("continuation-local-storage");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("html-webpack-plugin");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("webpack-merge");

/***/ })
/******/ ]);
//# sourceMappingURL=backend.js.map