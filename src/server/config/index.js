/**
 * Load environment variables from .env for local development.
 */
var path = require('path');
var R = require('ramda');
var chalk = require('chalk');
var env = require('dotenv').config({ path: path.resolve('.env') });
if (env.error) {
    console.warn(chalk.yellow("No config file was found at " + env.error.path));
}
else {
    console.info(chalk.green('Environment variables loaded from .env:'));
    console.info(chalk.grey(JSON.stringify(env, null, 2)));
}
var HEROKU_ENVS = ['heroku-develop', 'heroku-stage', 'heroku-live'];
var LOCAL_ENVS = ['local-develop'];
var TEST_ENVS = ['test', 'ci'];
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
        logging: R.contains(process.env.NODE_ENV, TEST_ENVS) && console.log
    }
};
