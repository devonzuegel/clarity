const chalk    = require('chalk')
const execSync = require('child_process').execSync

const runCmd = (cmd) => {
  console.info(chalk.dim(`\n$ ${cmd}`))
  execSync(cmd, { stdio: 'inherit' })
}

const build = () => {
  /** Note that this also builds the frontend with the hot-reloading dev server. */
  runCmd('webpack --config webpack/server/development.ts')
}

const lint = () => {
  runCmd("tslint -c tslint.json 'src/**/*.{ts,tsx}'")
}

const tasks = {
  'lint': lint,

  'start': () => {
    build()
    runCmd('NODE_ENV=development node build/backend.js')
  },

  'start:prod': () => {
    runCmd('node dist/backend.js')
  },

  'build': build,

  'build:prod': () => {
    runCmd('webpack --config webpack/frontend/production.ts')
    runCmd('webpack --config webpack/server/production.ts')
  },

  'test:ci': () => {
    lint()
    runCmd('NODE_ENV=ci jest')
    runCmd('NODE_ENV=ci nightwatch --config test/nightwatch.js')
  },

  'test:watch': () => {
    runCmd('NODE_ENV=test jest --watch')
  },

  'test': () => {
    lint()
    runCmd('NODE_ENV=test jest --coverage')
    runCmd('NODE_ENV=test nightwatch --config test/nightwatch.js')
  },
}

const taskName = process.argv[2]
const task     = tasks[taskName]

if (!task) {
  throw Error(chalk.black.bgRed(`\n\n  Task "${taskName}" is not defined\n`))
}

task()
