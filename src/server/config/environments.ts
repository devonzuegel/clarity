const path = require('path')
const chalk = require('chalk')
const dotenv = require('dotenv')

const getEnvVariables = () => {
  const fromDotenv = dotenv.config({path: path.resolve('.env')})
  if (fromDotenv.error) {
    console.warn(chalk.yellow(`No config file was found at ${fromDotenv.error.path}`))
    return process.env
  }
  console.info(chalk.green('Environment variables loaded from .env:'))
  console.info(chalk.grey(JSON.stringify(fromDotenv, null, 2)))
  return fromDotenv.parsed
}

module.exports = {
  HEROKU_ENVS: ['heroku-develop', 'heroku-stage', 'heroku-live'],
  LOCAL_ENVS: ['local-develop'],
  TEST_ENVS: ['test', 'ci'],
  getEnvVariables,
}
