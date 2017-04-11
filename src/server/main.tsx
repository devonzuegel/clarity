const config  = require('./config.js')
const React   = require('react')
const express = require('express')
const path    = require('path')
const Chalk   = require('chalk')
const app     = express()


if (process.env.NODE_ENV !== 'production') {
  const webpack         = require('webpack')
  const webpackConfig   = require('../../webpack/frontend/development').default
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

app.use('/', express.static(path.join(__dirname)))

app.get('*', (_: any, res: any) => {
  res.status(200).send(renderHTML())
})


console.info(Chalk.black.bgGreen(`\n\nListening at http://${config.host}:${config.port}\n`))
app.listen(config.port)

function renderHTML() {
  const html: string = `
    <div>
      <div id="root" />
      <script src="/frontend.js"></script>
    </div>
  `
  return `<!doctype html> ${html}`
}
