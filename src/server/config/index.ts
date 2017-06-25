/**
 * Load environment variables from .env for local development.
 */
import * as path from 'path'
import * as R from 'ramda'
import * as dotenv from 'dotenv'
const env = dotenv.config({path: path.resolve('.env')})
import {checkExpected} from './expected'
import {getValueSource} from './utils'
import {TEST_ENVS} from './environments'

const valueSource = getValueSource(env, process.env)
const nodeEnv = valueSource.NODE_ENV

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
    logging: !R.contains(nodeEnv, TEST_ENVS) && console.log,
  },
}

checkExpected(result)

export default result

