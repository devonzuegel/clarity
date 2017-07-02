const R = require('ramda')
const path = require('path')
const chalk = require('chalk')
const dotenv = require('dotenv')
const envFile = '.env'

const HEROKU_ENVS = ['heroku-develop', 'heroku-stage', 'heroku-live', 'heroku-tests']
const LOCAL_ENVS = ['test', 'local-develop']
const TEST_ENVS = ['test', 'ci', 'heroku-tests']
const ALL_ENVS = R.pipe(
  R.concat(HEROKU_ENVS),
  R.concat(LOCAL_ENVS),
  R.concat(TEST_ENVS),
  R.uniq
)([])

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

  if (!R.contains(result.NODE_ENV, ALL_ENVS)) {
    console.error(
      chalk.red(`NODE_ENV "${result.NODE_ENV}" is not supported. \n`) +
        chalk.grey(`Please provide one of: ${JSON.stringify(ALL_ENVS)}`)
    )
    throw Error('Invalid environment')
  }
  console.info(chalk.green('Environment variables loaded from .env:'))
  console.info(chalk.grey(JSON.stringify(result, null, 2)))

  return result
}

module.exports = {
  HEROKU_ENVS,
  LOCAL_ENVS,
  TEST_ENVS,
  getEnvVariables,
}
