const appConfig = require('./config.js')

const React       = require('react')
const express     = require('express')
const path        = require('path')
const compression = require('compression')
const Chalk       = require('chalk')
const app         = express()

app.use(compression())

if (process.env.NODE_ENV !== 'production') {
  const webpack         = require('webpack')
  const webpackConfig   = require('../webpack/frontend/development').default
  const webpackCompiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(webpackCompiler, {
    publicPath:         webpackConfig.output.publicPath,
    stats:              { colors: true },
    noInfo:             true,
    hot:                true,
    inline:             true,
    lazy:               false,
    historyApiFallback: true,
    quiet:              true,
  }))

  app.use(require('webpack-hot-middleware')(webpackCompiler))
}

app.get('*', (_: any, res: any) => {
  res.status(200).send(renderHTML())
})

app.listen(appConfig.port, appConfig.host, (err: any) => {
  if (err) {
    console.error(Chalk.bgRed(err))
  } else {
    console.info(Chalk.black.bgGreen(
      `\n\n  Listening at http://${appConfig.host}:${appConfig.port}\n`,
    ))
  }
})

function renderHTML() {
  const html: string = `
    <div>
      <div id="root" />
      <script src="/frontend.js"></script>
    </div>
  `
  return `<!doctype html> ${html}`
}
