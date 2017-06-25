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
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
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
var db_1 = __webpack_require__(3);
var user_mock_1 = __webpack_require__(33);
var sequelizeFailure = function (reject) {
    return function (error) {
        reject(error.errors[0]); // Return only the descriptive .errors array
    };
};
var UserService = function (_super) {
    __extends(UserService, _super);
    function UserService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserService.prototype.findByFacebookId = function (facebookId) {
        return new Promise(function (resolve, reject) {
            return db_1.models.User.findOne({ where: { facebookId: facebookId } }).then(function (user) {
                return resolve(user);
            }).catch(sequelizeFailure(reject));
        });
    };
    UserService.prototype.signIn = function (facebookId) {
        return new Promise(function (resolve, reject) {
            return db_1.models.User.findOrCreate({ where: { facebookId: facebookId } }).then(function (_a) {
                var user = _a[0],
                    _isNew = _a[1];
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
/* 2 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var cls = __webpack_require__(43);
var Sequelize = __webpack_require__(2);
var user_1 = __webpack_require__(26);
var post_1 = __webpack_require__(25);
var iteration_1 = __webpack_require__(24);
var config_1 = __webpack_require__(22);
var database_url = __webpack_require__(4).database_url;
var Database = function () {
    function Database() {
        var _this = this;
        this.getModels = function () {
            return _this.models;
        };
        this.getSequelize = function () {
            return _this.sequelize;
        };
        var _Sequelize = Sequelize;
        _Sequelize.cls = cls.createNamespace('sequelize-transaction');
        if (database_url) {
            this.sequelize = new _Sequelize(database_url, config_1.default);
        } else {
            this.sequelize = new _Sequelize(config_1.default.database, config_1.default.facebookId, config_1.default.password, config_1.default);
        }
        this.models = {
            User: user_1.default(this.sequelize),
            Post: post_1.default(this.sequelize),
            Iteration: iteration_1.default(this.sequelize)
        };
    }
    return Database;
}();
var database = new Database();
exports.models = database.getModels();
exports.sequelize = database.getSequelize();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Load environment variables from .env for local development.
 */
const path = __webpack_require__(0)
const R = __webpack_require__(7)
const chalk = __webpack_require__(10)
const env = __webpack_require__(44).config({path: path.resolve('.env')})

if (env.error) {
  console.warn(chalk.yellow(`No config file was found at ${env.error.path}`))
} else {
  console.info(chalk.green('Environment variables loaded from .env:'))
  console.info(chalk.grey(JSON.stringify(env, null, 2)))
}

const HEROKU_ENVS = ['heroku-develop', 'heroku-stage', 'heroku-live']
const LOCAL_ENVS = ['local-develop']
const TEST_ENVS = ['test', 'ci']

module.exports = {
  port: process.env.PORT,
  host: process.env.HOST,
  env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  sentry_dsn: process.env.SENTRY_DSN,

  /** Passport **/
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: process.env.FB_CALLBACK_URL,

  /*******************************************************************
   *** The db object is used by Sequelize to configure migrations. ***
   *******************************************************************/
  db: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    timezone: '+00:00',
    logging: R.contains(process.env.NODE_ENV, TEST_ENVS) && console.log,
  },
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var U = __webpack_require__(34);
exports.Enum = U.strEnum(['development', 'production']);

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

module.exports = require("webpack");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Further details on Sentry setup for Express/Node:
 *   - docs.sentry.io/clients/node/integrations/express/
 *   - docs.sentry.io/clients/node/config/
 */


Object.defineProperty(exports, "__esModule", { value: true });
var Raven = __webpack_require__(53);
exports.monitorExceptions = function (config) {
    return function (app) {
        // Must configure Raven before doing anything else with it
        Raven.config(config.sentry_dsn, { environment: config.env }).install();
        // The request handler must be the first middleware on the app
        app.use(Raven.requestHandler());
        // The error handler must be before any other error middleware
        app.use(Raven.errorHandler());
    };
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = __webpack_require__(29);
var posts_1 = __webpack_require__(28);
var authentication_1 = __webpack_require__(27);
exports.default = function (app) {
    users_1.default(app);
    app.use('/api/posts', posts_1.default);
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
    var webpack = __webpack_require__(11);
    var webpackConfig = __webpack_require__(35).default;
    var webpackCompiler = webpack(webpackConfig);
    app.use(__webpack_require__(55)(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true },
        noInfo: true,
        hot: true,
        inline: true,
        lazy: false,
        historyApiFallback: true,
        quiet: true
    }));
    app.use(__webpack_require__(56)(webpackCompiler));
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var passport = __webpack_require__(48);
var Facebook = __webpack_require__(49);
var user_1 = __webpack_require__(1);
var setupStrategy = function (c) {
    passport.use(new Facebook.Strategy(c, function (_token, _refreshToken, profile, done) {
        var facebookId = profile.id;
        user_1.userService.signIn(facebookId).then(function (_u) {
            return done(null, profile);
        }).catch(function (e) {
            return done(JSON.stringify(e));
        });
    }));
    passport.serializeUser(function (user, done) {
        return done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        return done(null, user);
    });
};
exports.setup = function (config) {
    return function (app) {
        setupStrategy(config);
        app.use(passport.initialize());
        app.use(passport.session());
        /**
         * Redirect the user to Facebook for authentication.  When complete,
         * Facebook will redirect the user back to the application at
         *     /auth/facebook/callback
         **/
        app.get('/auth/facebook', passport.authenticate('facebook'));
        /**
         * Facebook will redirect the user to this URL after approval. Finish
         * the authentication process by attempting to obtain an access token.
         * If access was granted, the user will be logged in. Otherwise,
         * authentication has failed.
         **/
        app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect: '/signin',
            failureRedirect: '/auth/facebook/failure'
        }));
        app.get('/auth/facebook/failure', function (_, res) {
            return res.send(403).json({
                message: 'Sorry, but we were not able to connect your Facebook account.'
            });
        });
        app.get('/api/profile', isLoggedIn, function (req, res) {
            res.json(req.user);
        });
        app.get('/api/signout', isLoggedIn, function (req, res) {
            req.logout();
            res.redirect('/');
        });
    };
};
/**
 * Route middleware to make sure a user is logged in
 **/
var isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(403).json({ message: 'Please sign in.' });
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(5);
exports.serveFrontend = function (app) {
    var fs = __webpack_require__(46);
    var path = __webpack_require__(0);
    app.use('/', express.static(__dirname));
    app.get('*', function (_, res) {
        var file = path.join("dist", 'index.html'); // TODO: Replace with raw-loader require
        var html = fs.readFileSync(file).toString();
        res.status(200).send(html);
    });
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var session = __webpack_require__(45);
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
/* 19 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var R = __webpack_require__(7);
var guest_1 = __webpack_require__(23);
var user_1 = __webpack_require__(1);
exports.signup = function (facebookId, session) {
    return new Promise(function (resolve, reject) {
        if (!facebookId) {
            return reject({ message: 'You must provide a facebookId' });
        }
        if (!session) {
            return reject({ message: 'You must initialize the API with a session' });
        }
        user_1.userService.create({ facebookId: facebookId }).then(function (user) {
            session['facebookId'] = facebookId;
            return resolve(user);
        }).catch(function (e) {
            if (e.type === 'unique violation') {
                return reject({
                    message: "The facebookId \"" + e.value + "\" is not available"
                });
            }
            return reject(R.pick(['message'], e));
        });
    });
};
exports.signIn = function (facebookId, session) {
    return new Promise(function (resolve, reject) {
        if (!facebookId) {
            return reject({ message: 'You must provide a facebookId' });
        }
        if (!session) {
            return reject({ message: 'You must initialize the API with a session' });
        }
        user_1.userService.findByFacebookId(facebookId).then(function (user) {
            if (!user) {
                return reject({
                    message: "User with facebookId \"" + facebookId + "\" does not exist"
                });
            }
            session['facebookId'] = facebookId;
            return resolve(user);
        }).catch(function (e) {
            return reject(e);
        });
    });
};
exports.signout = function (session) {
    return new Promise(function (resolve, reject) {
        if (!session) {
            return reject({ message: 'You must initialize the API with a session' });
        }
        session['facebookId'] = undefined;
        return resolve();
    });
};
exports.getCurrentUser = function (session) {
    return new Promise(function (resolve, reject) {
        if (!session) {
            return reject({ message: 'You must initialize the API with a session' });
        }
        if (!session.facebookId) {
            return resolve(new guest_1.GuestInstance());
        }
        user_1.userService.findByFacebookId(session.facebookId).then(function (user) {
            return resolve(user);
        }).catch(function (e) {
            return reject(e);
        });
    });
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var config = __webpack_require__(42);
exports.default = config;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var GuestInstance = function () {
    function GuestInstance() {
        this.facebookId = null;
    }
    return GuestInstance;
}();
exports.GuestInstance = GuestInstance;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var SequelizeStatic = __webpack_require__(2);
exports.default = function (sequelize) {
    var Schema = {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: SequelizeStatic.INTEGER
        },
        createdAt: {
            allowNull: false,
            type: SequelizeStatic.DATE
        },
        postId: {
            type: SequelizeStatic.INTEGER,
            allowNull: false
        },
        title: {
            type: SequelizeStatic.STRING,
            allowNull: false,
            len: 1
        },
        body: {
            len: 1,
            allowNull: false,
            type: SequelizeStatic.TEXT
        }
    };
    var Iteration = sequelize.define('Iteration', Schema, {
        classMethods: {
            associate: function (models) {
                return Iteration.belongsTo(models.Post);
            }
        }
    });
    return Iteration;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var SequelizeStatic = __webpack_require__(2);
exports.default = function (sequelize) {
    var Schema = {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: SequelizeStatic.INTEGER
        },
        createdAt: {
            allowNull: false,
            type: SequelizeStatic.DATE
        },
        userId: {
            type: SequelizeStatic.INTEGER,
            allowNull: false
        }
    };
    var Post = sequelize.define('Post', Schema, {
        classMethods: {
            associate: function (models) {
                return Post.belongsTo(models.User);
            }
        }
    });
    return Post;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var SequelizeStatic = __webpack_require__(2);
exports.default = function (sequelize) {
    var Schema = {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: SequelizeStatic.INTEGER
        },
        facebookId: {
            allowNull: false,
            unique: true,
            type: SequelizeStatic.STRING
        },
        createdAt: {
            allowNull: false,
            type: SequelizeStatic.DATE
        }
    };
    return sequelize.define('User', Schema, {});
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var requests_1 = __webpack_require__(6);
var authentication_1 = __webpack_require__(21);
exports.default = function (app) {
    app.post('/api/signup', function (req, res) {
        authentication_1.signup(req.body.facebookId, req.session).then(requests_1.jsonSuccess(res)).catch(requests_1.jsonError(res));
    });
    app.post('/api/signin', function (req, res) {
        authentication_1.signIn(req.body.facebookId, req.session).then(requests_1.jsonSuccess(res)).catch(requests_1.jsonError(res));
    });
    app.post('/api/signout', function (req, res) {
        authentication_1.signout(req.session).then(requests_1.jsonSuccess(res)).catch(requests_1.jsonError(res));
    });
    app.get('/api/session', function (req, res) {
        authentication_1.getCurrentUser(req.session).then(requests_1.jsonSuccess(res)).catch(requests_1.jsonError(res));
    });
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0:case 1:
                    t = op;break;
                case 4:
                    _.label++;return { value: op[1], done: false };
                case 5:
                    _.label++;y = op[1];op = [0];continue;
                case 7:
                    op = _.ops.pop();_.trys.pop();continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];t = op;break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];_.ops.push(op);break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(5);
var requests_1 = __webpack_require__(6);
var user_1 = __webpack_require__(1);
var post_1 = __webpack_require__(32);
var router = express.Router();
router.get('/', function (_, res) {
    return __awaiter(_this, void 0, void 0, function () {
        var posts, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(_.user);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3,, 4]);
                    return [4 /*yield*/, post_1.postService.all()];
                case 2:
                    posts = _a.sent();
                    res.status(200).json(posts);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    requests_1.jsonError(res)(e_1);
                    return [3 /*break*/, 4];
                case 4:
                    return [2 /*return*/];
            }
        });
    });
});
router.post('/create', function (req, res) {
    return __awaiter(_this, void 0, void 0, function () {
        var user, post, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3,, 4]);
                    return [4 /*yield*/, user_1.userService.findByFacebookId(req.body.facebookId)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, post_1.postService.create(user, {
                        title: req.body.title,
                        body: req.body.body
                    })];
                case 2:
                    post = _a.sent();
                    res.status(200).json(post);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    requests_1.jsonError(res)(e_2);
                    return [3 /*break*/, 4];
                case 4:
                    return [2 /*return*/];
            }
        });
    });
});
router.get('/:id', function (req, res) {
    return __awaiter(_this, void 0, void 0, function () {
        var iterations, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2,, 3]);
                    return [4 /*yield*/, post_1.postService.iterations(req.params.id)];
                case 1:
                    iterations = _a.sent();
                    res.status(200).json(iterations);
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    requests_1.jsonError(res)(e_3);
                    return [3 /*break*/, 3];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
});
router.post('/:id/iterate', function (req, res) {
    return __awaiter(_this, void 0, void 0, function () {
        var postId, iteration, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2,, 3]);
                    postId = Number(req.params.id);
                    return [4 /*yield*/, post_1.postService.iterate(postId, req.body)];
                case 1:
                    iteration = _a.sent();
                    res.status(200).json(iteration);
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    requests_1.jsonError(res)(e_4);
                    return [3 /*break*/, 3];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
});
exports.default = router;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var requests_1 = __webpack_require__(6);
var user_1 = __webpack_require__(1);
exports.default = function (app) {
    app.get('/api/users', function (_, res) {
        user_1.userService.all().then(function (users) {
            return res.status(200).json(users);
        }).catch(requests_1.jsonError(res));
    });
    app.post('/api/users/create', function (req, res) {
        user_1.userService.create({ facebookId: req.query.facebookId }).then(function (user) {
            return res.status(200).json(user);
        }).catch(requests_1.jsonError(res));
    });
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(5);
var bodyParser = __webpack_require__(19);
var http_1 = __webpack_require__(13);
var Passport = __webpack_require__(16);
var middleware_1 = __webpack_require__(15);
var listen_1 = __webpack_require__(14);
var exceptionMonitoring_1 = __webpack_require__(12);
var serveFrontend_1 = __webpack_require__(17);
var db_1 = __webpack_require__(3);
var session_1 = __webpack_require__(18);
var config = __webpack_require__(4);
var app = express();
app.use(bodyParser.json());
app.use(__webpack_require__(20)());
exceptionMonitoring_1.monitorExceptions(config)(app);
session_1.setupSession(app); // Must happen before initializing the API
http_1.default(app);
Passport.setup(config)(app);
if (config.env === 'development') {
    middleware_1.runHotMiddleware(app);
}
serveFrontend_1.serveFrontend(app);
db_1.sequelize.sync().then(function () {
    return listen_1.listen(app, config);
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0:case 1:
                    t = op;break;
                case 4:
                    _.label++;return { value: op[1], done: false };
                case 5:
                    _.label++;y = op[1];op = [0];continue;
                case 7:
                    op = _.ops.pop();_.trys.pop();continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];t = op;break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];_.ops.push(op);break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var MockPostService = function () {
    function MockPostService() {
        this.mockPost = {
            postId: 9,
            title: 'Foo Bar Baz'
        };
    }
    MockPostService.prototype.create = function (user, _iteration) {
        return new Promise(function (resolve, _) {
            var mock = { dataValues: { userId: user.get('id') } };
            resolve(mock);
        });
    };
    MockPostService.prototype.all = function () {
        return new Promise(function (resolve, _) {
            var baz = [{ dataValues: { userId: 1 } }, { dataValues: { userId: 2 } }, { dataValues: { userId: 2 } }];
            resolve(baz);
        });
    };
    MockPostService.prototype.iterations = function (postId) {
        return new Promise(function (resolve, reject) {
            if (postId % 2) {
                var mock = [{ dataValues: { postId: postId, title: 'Post 1, with no body' } }, {
                    dataValues: {
                        postId: postId,
                        title: 'Post 2, with body',
                        body: 'Body of post 2'
                    }
                }];
                resolve(mock);
            } else {
                reject({ message: "Cannot find post with id " + postId });
            }
        });
    };
    MockPostService.prototype.iterate = function (postId, data) {
        var _this = this;
        return new Promise(function (resolve, _) {
            return __awaiter(_this, void 0, void 0, function () {
                var mock;
                return __generator(this, function (_a) {
                    mock = { dataValues: __assign({}, this.mockPost, data, { postId: postId }) };
                    resolve(mock);
                    return [2 /*return*/];
                });
            });
        });
    };
    return MockPostService;
}();
exports.MockPostService = MockPostService;

/***/ }),
/* 32 */
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
var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0:case 1:
                    t = op;break;
                case 4:
                    _.label++;return { value: op[1], done: false };
                case 5:
                    _.label++;y = op[1];op = [0];continue;
                case 7:
                    op = _.ops.pop();_.trys.pop();continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];t = op;break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];_.ops.push(op);break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var R = __webpack_require__(7);
var db_1 = __webpack_require__(3);
var post_mock_1 = __webpack_require__(31);
var sequelizeFailure = function (reject) {
    return function (error) {
        console.warn(error); // Log full error
        reject(error); // Return only the descriptive .errors array
        // reject(error.errors[0]) // Return only the descriptive .errors array
    };
};
var validateIteration = function (iteration, reject, cb) {
    if (R.isEmpty(iteration.title)) {
        return reject('Please provide a title.');
    }
    if (R.isEmpty(iteration.body)) {
        return reject('Please write something.');
    }
    cb();
};
var initPost = function (resolve, userId, iteration) {
    return function (t) {
        return __awaiter(_this, void 0, void 0, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, db_1.models.Post.create({ userId: userId }, { transaction: t })];
                    case 1:
                        post = _a.sent();
                        return [4 /*yield*/, db_1.models.Iteration.create(__assign({}, iteration, { postId: post.get('id') }))];
                    case 2:
                        _a.sent();
                        resolve(post);
                        return [2 /*return*/];
                }
            });
        });
    };
};
var PostService = function (_super) {
    __extends(PostService, _super);
    function PostService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PostService.prototype.create = function (user, iteration) {
        return new Promise(function (resolve, reject) {
            if (!user || !user.get('id')) {
                return reject('Please provide a user.');
            }
            validateIteration(iteration, reject, function () {
                return db_1.sequelize.transaction(initPost(resolve, user.get('id'), iteration)).then(function (post) {
                    return resolve(post);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        });
    };
    PostService.prototype.all = function () {
        return new Promise(function (resolve, reject) {
            return db_1.models.Post.findAll().then(function (posts) {
                return resolve(posts);
            }).catch(sequelizeFailure(reject));
        });
    };
    PostService.prototype.iterations = function (postId) {
        return new Promise(function (resolve, reject) {
            return db_1.models.Iteration.findAll({ where: { postId: postId } }).then(resolve).catch(reject);
        });
    };
    PostService.prototype.iterate = function (postId, data) {
        return new Promise(function (resolve, reject) {
            validateIteration(data, reject, function () {
                return db_1.models.Iteration.create(__assign({ postId: postId }, data)).then(resolve).catch(reject);
            });
        });
    };
    PostService.prototype.comments = function (iterationId) {
        return new Promise(function (resolve, _reject) {
            iterationId;
            resolve([]);
        });
    };
    return PostService;
}(post_mock_1.MockPostService);
exports.PostService = PostService;
exports.postService = new PostService();

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var MockUserService = function () {
    function MockUserService() {}
    MockUserService.prototype.findByFacebookId = function (facebookId) {
        return new Promise(function (resolve, reject) {
            if (!facebookId) {
                reject({ message: "Please provide a facebookId" });
            }
            if (facebookId == 'thisUsernameDoesntExist') {
                reject({ message: "User with facebookId \"" + facebookId + "\" does not exist" });
            }
            resolve({
                dataValues: { facebookId: facebookId, id: 123 },
                get: function (key) {
                    switch (key) {
                        case 'id':
                            return 123;
                        default:
                            throw Error("Value for key \"" + key + "\" is undefined on mock user");
                    }
                }
            });
        });
    };
    MockUserService.prototype.create = function (attributes) {
        return new Promise(function (resolve, reject) {
            if (attributes.facebookId == 'thisUsernameIsntAvailable') {
                reject({ message: "Sorry, \"" + attributes.facebookId + "\" is not available" });
            }
            resolve({ dataValues: attributes });
        });
    };
    MockUserService.prototype.all = function () {
        return new Promise(function (resolve, _) {
            resolve([{ facebookId: 'foobar' }]);
        });
    };
    return MockUserService;
}();
exports.MockUserService = MockUserService;

/***/ }),
/* 34 */
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Env = __webpack_require__(8);
var _1 = __webpack_require__(36);
exports.default = _1.setup(Env.Enum.development);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var webpackMerge = __webpack_require__(57);
var path = __webpack_require__(0);
var Env = __webpack_require__(8);
exports.setup = function (env) {
    var isProd = String(env) === String(Env.Enum.production);
    var options = {
        rootDir: path.join(__dirname, '../..'),
        outputDir: isProd ? 'dist' : 'build',
        devtool: 'source-map',
        console: !isProd,
        isProd: isProd
    };
    var shared = [__webpack_require__(38), __webpack_require__(37), __webpack_require__(41)];
    var partials = isProd ? [__webpack_require__(40)].concat(shared) : [__webpack_require__(39)].concat(shared);
    return webpackMerge(partials.map(function (m) {
        return m.partial(options);
    }));
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var path = __webpack_require__(0);
var webpack = __webpack_require__(11);
var HtmlWebpackPlugin = __webpack_require__(47);
var entryFile = './src/frontend/main.tsx';
exports.partial = function (c) {
    return {
        entry: c.isProd ? entryFile : {
            app: ['webpack-hot-middleware/client?reload=true', entryFile]
        },
        output: {
            path: path.join(c.rootDir, c.outputDir),
            filename: 'frontend.js',
            publicPath: '/'
        },
        devtool: c.devtool,
        plugins: [new webpack.HotModuleReplacementPlugin(),
        // ...(c.isProd ? [] : [new webpack.HotModuleReplacementPlugin()]),
        new HtmlWebpackPlugin({ template: './src/frontend/index.html' })]
    };
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var loaders = function (c) {
    var frontendDir = function (path) {
        if (path === void 0) {
            path = '';
        }
        return c.rootDir + "/src/frontend/" + path;
    };
    return [{
        loader: 'style-loader'
    }, {
        loader: 'css-loader',
        options: {
            importLoaders: 2,
            sourceMap: true,
            modules: true,
            localIdentName: '[local]___[hash:base64:5]'
        }
    }, {
        loader: 'postcss-loader',
        options: {
            plugins: function () {
                return [__webpack_require__(52)({ path: [frontendDir()] }), __webpack_require__(51)(), __webpack_require__(50)({ relative: frontendDir() })];
            }
        }
    }];
};
exports.partial = function (c) {
    return {
        module: {
            rules: [{
                include: c.rootDir,
                test: /\.css?$/,
                use: loaders(c),
                exclude: /node_modules/
            }]
        }
    };
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var CheckerPlugin = __webpack_require__(9).CheckerPlugin;
exports.partial = function () {
    return {
        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: __webpack_require__(54)(['react-hot-loader', 'awesome-typescript-loader']),
                exclude: /node_modules/
            }]
        },
        plugins: [new CheckerPlugin()]
    };
};

/***/ }),
/* 40 */
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
/* 41 */
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
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
            alias: {
                '~': path.resolve('./src')
            }
        }
    };
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * NOTE: The Sequelize CLI expects config to be either .json or .js. As
 * as result, this JS file has to exist in order to execute migrations.
 * The index.ts file in this same directory is identical to this, but
 * enforces the typed IDatabaseConfig interface.
 */

const appConfig = __webpack_require__(4)

module.exports = appConfig.db


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("continuation-local-storage");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("html-webpack-plugin");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("postcss-assets");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("postcss-cssnext");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("postcss-import");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("raven");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("webpack-combine-loaders");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("webpack-merge");

/***/ })
/******/ ]);
//# sourceMappingURL=backend.js.map