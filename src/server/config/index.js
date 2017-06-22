/**
 * Load environment variables from .env for local development.
 */
const path = require('path')
const R = require('ramda')
const chalk = require('chalk')
const env = require('dotenv').config({path: path.resolve('.env')})

let nodeEnv
if (env.error) {
  console.warn(chalk.yellow(`No config file was found at ${env.error.path}`))
  nodeEnv = process.env.NODE_ENV
} else {
  console.info(chalk.green('Environment variables loaded from .env:'))
  console.info(chalk.grey(JSON.stringify(env, null, 2)))
  nodeEnv = env.parsed.NODE_ENV
}

const HEROKU_ENVS = ['heroku-develop', 'heroku-stage', 'heroku-live']
const LOCAL_ENVS = ['local-develop']
const TEST_ENVS = ['test', 'ci']

const notCircleCI = R.contains(nodeEnv, HEROKU_ENVS + LOCAL_ENVS)

const dbConnection = notCircleCI
  ? {use_env_variable: 'DATABASE_URL'} /** For Heroku and local develoment **/
  : {
      /** For Circle CI **/
      database: process.env.DB_NAME,
      facebookId: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    }

const result = {
  port: process.env.PORT,
  host: process.env.HOST,
  env: nodeEnv,
  database_url: process.env.DATABASE_URL,
  sentry_dsn: process.env.SENTRY_DSN,

  /** Passport **/
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: process.env.FB_CALLBACK_URL,

  /*******************************************************************
   *** The db object is used by Sequelize to configure migrations. ***
   *******************************************************************/
  db: R.merge(dbConnection, {
    dialect: 'postgres',
    timezone: '+00:00',
    logging: R.contains(nodeEnv, TEST_ENVS) && console.log,
  }),
}

const expected = {
  // TODO: remove
  port: '4000',
  host: 'localhost',
  env: 'local-develop',
  database_url: 'postgresql://devonzuegel:password@localhost:5432/clarity_development',
  sentry_dsn: 'https://56cd04eab54d4dae8a9349f1e9ae195e@sentry.io/159491',
  clientID: '1379971895423848',
  clientSecret: '385565c12103786b368891b69a87242d',
  callbackURL: 'http://localhost:4000/auth/facebook/callback',
  db: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    timezone: '+00:00',
    logging: false,
  },
}

if (JSON.stringify(expected) == JSON.stringify(result)) {
  console.log('result:')
  console.log(chalk.blue(JSON.stringify(result, null, 2)))
} else {
  console.log('result:')
  console.log(chalk.red(JSON.stringify(result, null, 2)))
  console.log('expected:')
  console.log(chalk.yellow(JSON.stringify(expected, null, 2)))
}

module.exports = result
