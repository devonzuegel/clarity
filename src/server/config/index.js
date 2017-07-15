/**
 * Load environment variables from .env for local development.
 */
const R = require('ramda')
const {TEST_ENVS, getEnvVariables} = require('./environments.ts')

const env = getEnvVariables()
const isTesting = R.contains(env.NODE_ENV, TEST_ENVS)

module.exports = {
  port: env.PORT,
  host: env.HOST,
  env: env.NODE_ENV,
  database_url: env.DATABASE_URL,
  sentry_dsn: env.SENTRY_DSN,

  /** Mocks **/
  mockAuthentication: isTesting,

  /** Passport **/
  clientID: env.FB_CLIENT_ID,
  clientSecret: env.FB_CLIENT_SECRET,
  callbackURL: env.FB_CALLBACK_URL,

  /**************************************************************
   *** Sequelize uses this db object to configure migrations. ***
   **************************************************************/
  db: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    timezone: '+00:00',
    logging: !isTesting && console.info,
  },
}
