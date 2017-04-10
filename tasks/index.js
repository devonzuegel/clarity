const chalk    = require('chalk')
const execSync = require('child_process').execSync

const runCmd = (cmd) => {
  console.info(chalk.dim(`$ ${cmd}`))
  execSync(cmd, { stdio: 'inherit' })
}

const tasks = {
  build: () =>
    runCmd('webpack --config webpack/development.ts'),

  'build:prod': () =>
    runCmd('webpack --config webpack/production.ts'),
}

const taskName = process.argv[2]
const task     = tasks[taskName]

if (!task) {
  throw Error(chalk.black.bgRed(`\n\n  Task "${taskName}" is not defined\n`))
}

task()
