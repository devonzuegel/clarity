/**
 * Load environment variables from .env for local development.
 */
const path = require('path')
const R = require('ramda')
const chalk = require('chalk')
const env = require('dotenv').config({path: path.resolve('.env')})
const {checkExpected} = require('./expected')
const {getValueSource} = require('./utils')
const {HEROKU_ENVS, LOCAL_ENVS, TEST_ENVS} = require('./environments')

const valueSource = getValueSource(env, process.env)
const nodeEnv = valueSource.NODE_ENV
const notCircleCI = R.contains(nodeEnv, HEROKU_ENVS + LOCAL_ENVS)

const result = {
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
    logging: R.contains(nodeEnv, TEST_ENVS) && console.log,
  },
}

checkExpected(result)

module.exports = result
