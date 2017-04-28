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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Load environment variables from .env for local development.
 * If no .env file is to be found at
 */
const path  = __webpack_require__(0)
const chalk = __webpack_require__(10)
const env   = __webpack_require__(35).config({ path: path.resolve('.env') })

if (env.error) {
  console.warn(chalk.yellow(`No config file was found at ${env.error.path}`))
} else {
  console.info(chalk.green('Environment variables loaded from .env:'))
  console.info(chalk.grey(JSON.stringify(env, null, 2)))
}

module.exports = {
  port:         process.env.PORT || 4000,
  host:         process.env.HOST || 'localhost',
  env:          process.env.NODE_ENV || 'development',
  database_url: process.env.DATABASE_URL,
  sentry_dsn:   process.env.SENTRY_DSN,
  db: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    dialect:  'postgres',
    timezone: '+00:00',
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var cls = __webpack_require__(34);
var Sequelize = __webpack_require__(11);
var user_1 = __webpack_require__(23);
var config_1 = __webpack_require__(21);
var database_url = __webpack_require__(1).database_url;
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
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __webpack_require__(2);
var user_mock_1 = __webpack_require__(27);
var sequelizeFailure = function (reject) {
    return function (error) {
        console.error(error); // Log full error
        reject(error.errors[0]); // Return only the descriptive .errors array
    };
};
var UserService = function (_super) {
    __extends(UserService, _super);
    function UserService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserService.prototype.findByUsername = function (username) {
        return new Promise(function (resolve, reject) {
            return db_1.models.User.findOne({ where: { username: username } }).then(function (user) {
                return resolve(user);
            }).catch(sequelizeFailure(reject));
        });
    };
    UserService.prototype.create = function (attributes) {
        return new Promise(function (resolve, reject) {
            return db_1.models.User.create(attributes).then(function (user) {
                return resolve(user);
            }).catch(sequelizeFailure(reject));
        });
    };
    UserService.prototype.all = function () {
        return new Promise(function (resolve, reject) {
            return db_1.models.User.findAll().then(function (users) {
                return resolve(users);
            }).catch(sequelizeFailure(reject));
        });
    };
    return UserService;
}(user_mock_1.MockUserService);
exports.UserService = UserService;
exports.userService = new UserService();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonError = function (res) {
    return function (error) {
        res.status(500).json(error);
    };
};
exports.jsonSuccess = function (res) {
    return function (json) {
        res.status(200).json(json);
    };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var path = __webpack_require__(0);
var webpack = __webpack_require__(12);
var HtmlWebpackPlugin = __webpack_require__(38);
var entryFile = './src/frontend/main.tsx';
exports.partial = function (c) {
    return {
        entry: c.isProd ? entryFile : { app: ['webpack-hot-middleware/client?reload=true', entryFile] },
        output: {
            path: path.join(c.rootDir, c.outputDir),
            filename: 'frontend.js',
            publicPath: '/'
        },
        devtool: c.devtool,
        plugins: (c.isProd ? [] : [new webpack.HotModuleReplacementPlugin()]).concat([new HtmlWebpackPlugin({ template: './src/frontend/index.html' })])
    };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var U = __webpack_require__(28);
exports.Enum = U.strEnum(['development', 'production']);

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports) {

module.exports = require("awesome-typescript-loader");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = __webpack_require__(25);
var authentication_1 = __webpack_require__(24);
exports.default = function (app) {
    users_1.default(app);
    authentication_1.default(app);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Chalk = __webpack_require__(10);
exports.listen = function (app, _a) {
    var host = _a.host,
        port = _a.port;
    console.info(Chalk.black.bgGreen("\n\nListening at http://" + host + ":" + port + "\n"));
    app.listen(port);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.runHotMiddleware = function (app) {
    var webpack = __webpack_require__(12);
    var webpackConfig = __webpack_require__(29).default;
    var webpackCompiler = webpack(webpackConfig);
    app.use(__webpack_require__(41)(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true },
        noInfo: true,
        hot: true,
        inline: true,
        lazy: false,
        historyApiFallback: true,
        quiet: true
    }));
    app.use(__webpack_require__(42)(webpackCompiler));
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(3);
exports.serveFrontend = function (app) {
    var fs = __webpack_require__(37);
    var path = __webpack_require__(0);
    app.use('/', express.static(__dirname));
    app.get('*', function (_, res) {
        var file = path.join("dist", 'index.html'); // TODO: Replace with raw-loader require
        var html = fs.readFileSync(file).toString();
        res.status(200).send(html);
    });
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var session = __webpack_require__(36);
exports.setupSession = function (app) {
    /** More info: github.com/expressjs/session#options */
    var options = {
        secret: 'ssshhhhh',
        resave: false,
        saveUninitialized: true
    };
    app.use(session(options));
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var R = __webpack_require__(39);
var guest_1 = __webpack_require__(22);
var user_1 = __webpack_require__(4);
exports.signup = function (username, session) {
    return new Promise(function (resolve, reject) {
        if (!username) {
            return reject({ message: 'You must provide a username' });
        }
        if (!session) {
            return reject({ message: 'You must initialize the API with a session' });
        }
        user_1.userService.create({ username: username }).then(function (user) {
            session['username'] = username;
            return resolve(user);
        }).catch(function (e) {
            if (e.type === 'unique violation') {
                return reject({ message: "The username \"" + e.value + "\" is not available" });
            }
            return reject(R.pick(['message'], e));
        });
    });
};
exports.login = function (username, session) {
    return new Promise(function (resolve, reject) {
        if (!username) {
            return reject({ message: 'You must provide a username' });
        }
        if (!session) {
            return reject({ message: 'You must initialize the API with a session' });
        }
        user_1.userService.findByUsername(username).then(function (user) {
            if (!user) {
                return reject({ message: "User with username \"" + username + "\" does not exist" });
            }
            session['username'] = username;
            return resolve(user);
        }).catch(function (e) {
            return reject(e);
        });
    });
};
exports.logout = function (session) {
    return new Promise(function (resolve, reject) {
        if (!session) {
            return reject({ message: 'You must initialize the API with a session' });
        }
        session['username'] = undefined;
        return resolve();
    });
};
exports.getCurrentUser = function (session) {
    return new Promise(function (resolve, reject) {
        if (!session) {
            return reject({ message: 'You must initialize the API with a session' });
        }
        if (!session.username) {
            return resolve(new guest_1.GuestInstance());
        }
        user_1.userService.findByUsername(session.username).then(function (user) {
            return resolve(user);
        }).catch(function (e) {
            return reject(e);
        });
    });
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var config = __webpack_require__(33);
exports.default = config;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var GuestInstance = function () {
    function GuestInstance() {
        this.username = null;
    }
    return GuestInstance;
}();
exports.GuestInstance = GuestInstance;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var SequelizeStatic = __webpack_require__(11);
exports.default = function (sequelize) {
    var Schema = {
        username: {
            type: SequelizeStatic.STRING,
            allowNull: false,
            unique: true
        }
    };
    return sequelize.define('User', Schema, {});
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var requests_1 = __webpack_require__(5);
var authentication_1 = __webpack_require__(20);
exports.default = function (app) {
    app.post('/signup', function (req, res) {
        authentication_1.signup(req.query.username, req.session).then(requests_1.jsonSuccess(res)).catch(requests_1.jsonError(res));
    });
    app.post('/login', function (req, res) {
        authentication_1.login(req.query.username, req.session).then(requests_1.jsonSuccess(res)).catch(requests_1.jsonError(res));
    });
    app.post('/logout', function (req, res) {
        authentication_1.logout(req.session).then(requests_1.jsonSuccess(res)).catch(requests_1.jsonError(res));
    });
    app.get('/session', function (req, res) {
        authentication_1.getCurrentUser(req.session).then(requests_1.jsonSuccess(res)).catch(requests_1.jsonError(res));
    });
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var requests_1 = __webpack_require__(5);
var user_1 = __webpack_require__(4);
exports.default = function (app) {
    app.get('/users', function (_, res) {
        user_1.userService.all().then(function (users) {
            return res.status(200).json(users);
        }).catch(requests_1.jsonError(res));
    });
    app.post('/users/create', function (req, res) {
        user_1.userService.create({ username: req.query.username }).then(function (user) {
            return res.status(200).json(user);
        }).catch(requests_1.jsonError(res));
    });
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(3);
var bodyParser = __webpack_require__(18);
var http_1 = __webpack_require__(13);
var middleware_1 = __webpack_require__(15);
var listen_1 = __webpack_require__(14);
// import { monitorExceptions } from './exceptionMonitoring'
var serveFrontend_1 = __webpack_require__(16);
var db_1 = __webpack_require__(2);
var session_1 = __webpack_require__(17);
var config = __webpack_require__(1);
var app = express();
app.use(bodyParser.json());
app.use(__webpack_require__(19)());
// monitorExceptions(config)(app)
session_1.setupSession(app); // Must happen before initializing the API
http_1.default(app);
if (config.env === 'development') {
    middleware_1.runHotMiddleware(app);
}
serveFrontend_1.serveFrontend(app);
db_1.sequelize.sync().then(function () {
    return listen_1.listen(app, config);
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var MockUserService = function () {
    function MockUserService() {}
    MockUserService.prototype.findByUsername = function (username) {
        return new Promise(function (resolve, reject) {
            if (username == 'thisUsernameDoesntExist') {
                reject({ message: "User with username \"" + username + "\" does not exist" });
            }
            resolve({ username: username });
        });
    };
    MockUserService.prototype.create = function (attributes) {
        return new Promise(function (resolve, reject) {
            if (attributes.username == 'thisUsernameIsntAvailable') {
                reject({ message: "Sorry, \"" + attributes.username + "\" is not available" });
            }
            resolve(attributes);
        });
    };
    MockUserService.prototype.all = function () {
        return new Promise(function (resolve, _) {
            resolve([{ username: 'foobar' }]);
        });
    };
    return MockUserService;
}();
exports.MockUserService = MockUserService;

/***/ }),
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Env = __webpack_require__(7);
var _1 = __webpack_require__(30);
exports.default = _1.setup(Env.Enum.development);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var webpackMerge = __webpack_require__(43);
var path = __webpack_require__(0);
var Env = __webpack_require__(7);
exports.setup = function (env) {
    var isProd = String(env) === String(Env.Enum.production);
    var options = {
        rootDir: path.join(__dirname, '../..'),
        outputDir: isProd ? 'dist' : 'build',
        devtool: 'source-map',
        console: !isProd,
        isProd: isProd
    };
    var partials = isProd ? [__webpack_require__(32), __webpack_require__(6), __webpack_require__(8)] : [__webpack_require__(31), __webpack_require__(6), __webpack_require__(8)];
    return webpackMerge(partials.map(function (m) {
        return m.partial(options);
    }));
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var CheckerPlugin = __webpack_require__(9).CheckerPlugin;
exports.partial = function () {
    return {
        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: __webpack_require__(40)(['react-hot-loader', 'awesome-typescript-loader']),
                exclude: /node_modules/
            }]
        },
        plugins: [new CheckerPlugin()]
    };
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var CheckerPlugin = __webpack_require__(9).CheckerPlugin;
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * NOTE: The Sequelize CLI expects config to be either .json or .js. As
 * as result, this JS file has to exist in order to execute migrations.
 * The index.ts file in this same directory is identical to this, but
 * enforces the typed IDatabaseConfig interface.
 */

const appConfig = __webpack_require__(1)

module.exports = appConfig.db


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("continuation-local-storage");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("html-webpack-plugin");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("webpack-combine-loaders");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("webpack-merge");

/***/ })
/******/ ]);
//# sourceMappingURL=backend.js.map