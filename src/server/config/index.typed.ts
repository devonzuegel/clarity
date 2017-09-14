type TConfig = {
  port: number
  host: string
  env: string
  database_url: string
  sentry_dsn: string
  new_relic: string

  /** Mocks **/
  mockAuthentication: boolean

  /** Passport **/
  clientID: string
  clientSecret: string
  callbackURL: string

  db: {
    use_env_variable: string
    dialect: string
    timezone: string
    logging: boolean
  }
}

const config: TConfig = require('~/server/config/index.js')

export default config
