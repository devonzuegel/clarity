"use strict";
exports.__esModule = true;
var path = require("path");
var R = require("ramda");
var dotenv = require("dotenv");
var expected_1 = require("./expected");
var utils_1 = require("./utils");
var environments_1 = require("./environments");
var valueSource = utils_1.getValueSource(
/** Load environment variables from .env for local development. **/
dotenv.config({ path: path.resolve('.env') }), process.env);
var nodeEnv = valueSource.NODE_ENV;
var result = {
    port: valueSource.PORT,
    host: valueSource.HOST,
    env: nodeEnv,
    database_url: valueSource.DATABASE_URL,
    sentry_dsn: valueSource.SENTRY_DSN,
    /** Passport **/
    clientID: valueSource.FB_CLIENT_ID,
    clientSecret: valueSource.FB_CLIENT_SECRET,
    callbackURL: valueSource.FB_CALLBACK_URL,
    /*******************************************************************
     *** The db object is used by Sequelize to configure migrations. ***
     *******************************************************************/
    db: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        timezone: '+00:00',
        logging: !R.contains(nodeEnv, environments_1.TEST_ENVS) && console.log
    }
};
expected_1.checkExpected(result);
module.exports = result;
