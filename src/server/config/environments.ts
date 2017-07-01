const R = require('ramda')
const path = require('path')
const chalk = require('chalk')
const dotenv = require('dotenv')
const envFile = '.env'

const getEnvVariables = () => {
  const fromDotenv = dotenv.config({path: path.resolve(envFile)})

  if (fromDotenv.error) {
    console.warn(
      chalk.yellow(`No config file was found at ${fromDotenv.error.path}`)
    )
    return process.env
  }

  if (fromDotenv.parsed.NODE_ENV !== process.env.NODE_ENV) {
    console.info(
      chalk.yellow(
        `WARNING: ${envFile} specifies NODE_ENV=${fromDotenv.parsed.NODE_ENV}, ` +
          `but it be overriden by NODE_ENV=${process.env.NODE_ENV}`
      )
    )
  }

  const result = R.merge(fromDotenv.parsed, {
    NODE_ENV: process.env.NODE_ENV, // Override
  })

  console.info(chalk.green('Environment variables loaded from .env:'))
  console.info(chalk.grey(JSON.stringify(result, null, 2)))

  return result
}

module.exports = {
  HEROKU_ENVS: ['heroku-develop', 'heroku-stage', 'heroku-live'],
  LOCAL_ENVS: ['test', 'local-develop'],
  TEST_ENVS: ['test', 'ci'],
  getEnvVariables,
}
