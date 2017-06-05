/**
 * Load environment variables from .env for local development.
 * If no .env file is to be found at
 */
const path  = require('path')
const R     = require('ramda')
const chalk = require('chalk')
const env   = require('dotenv').config({ path: path.resolve('.env') })

if (env.error) {
  console.warn(chalk.yellow(`No config file was found at ${env.error.path}`))
} else {
  console.info(chalk.green('Environment variables loaded from .env:'))
  console.info(chalk.grey(JSON.stringify(env, null, 2)))
}

const herokuEnvs = [
  'heroku-develop',
  'heroku-stage',
  'heroku-live',
]
const localEnvs = [
  'local-develop',
]
const dbConnection = (
  R.contains(process.env.NODE_ENV, herokuEnvs + localEnvs)
  ? { /** For Heroku and local develoment **/
    use_env_variable: 'DATABASE_URL'
  }
  : { /** For Circle CI **/
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
  }
)

module.exports = {
  port:         process.env.PORT,
  host:         process.env.HOST,
  env:          process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  sentry_dsn:   process.env.SENTRY_DSN,

  /** Passport **/
  clientID:     process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL:  process.env.FB_CALLBACK_URL,

  /*******************************************************************
   *** The db object is used by Sequelize to configure migrations. ***
   *******************************************************************/
  db: R.merge(dbConnection, {
    dialect:  'postgres',
    timezone: '+00:00',
    logging:  (
      process.env.NODE_ENV !== 'test' &&
      process.env.NODE_ENV !== 'ci' &&
      console.log
    ),
  })
}
