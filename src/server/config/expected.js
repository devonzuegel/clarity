const chalk = require('chalk')

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

const checkExpected = result => {
  if (JSON.stringify(expected) == JSON.stringify(result)) {
    console.log('result:')
    console.log(chalk.blue(JSON.stringify(result, null, 2)))
  } else {
    console.log('result:')
    console.log(chalk.red(JSON.stringify(result, null, 2)))
    console.log('expected:')
    console.log(chalk.yellow(JSON.stringify(expected, null, 2)))
  }
}

module.exports = {checkExpected}
