const chalk = require('chalk')
const execSync = require('child_process').execSync

const runCmd = cmd => {
  console.info(chalk.dim(`\n$ ${cmd}`))
  execSync(cmd, {stdio: 'inherit'})
}

const lint = () => {
  runCmd('./tasks/noConsole.sh')
  runCmd("tslint -c tslint.json 'src/**/*.{ts,tsx}'")
}

const tasks = {
  /****************************************************************************/
  /** Linting *****************************************************************/
  /****************************************************************************/

  lint,

  /****************************************************************************/
  /** Development *************************************************************/
  /****************************************************************************/

  start: () => {
    /** Note that this builds the frontend with the hot-reloading dev server. */
    runCmd('webpack --config webpack/server/development.ts')
    runCmd('node build/backend.js')
  },

  /****************************************************************************/
  /** Production **************************************************************/
  /****************************************************************************/

  'build:prod': () => {
    runCmd('webpack --config webpack/frontend/production.ts')
    runCmd('webpack --config webpack/server/production.ts')
  },

  'start:prod': () => {
    runCmd('node dist/backend.js')
  },

  /****************************************************************************/
  /** Testing *****************************************************************/
  /****************************************************************************/

  'test:ci': () => {
    lint()
    runCmd('NODE_ENV=ci jest')
    runCmd('NODE_ENV=ci nightwatch --config test/nightwatch.js')
  },

  'test:watch': () => {
    runCmd('NODE_ENV=test jest --watch')
  },

  test: () => {
    lint()
    runCmd('NODE_ENV=test jest --coverage')
    runCmd('NODE_ENV=test nightwatch --config test/nightwatch.js')
  },
}

const taskName = process.argv[2]
const task = tasks[taskName]

if (!task) {
  throw Error(chalk.black.bgRed(`\n\n  Task "${taskName}" is not defined\n`))
}

task()
