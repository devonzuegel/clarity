import * as express from 'express'
import * as Chalk   from 'chalk'

export const runHotMiddleware = (app: express.Application) => {
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

export const listen = (app: express.Application, { host, port }: { host: string, port: number }) => {
  console.info(Chalk.black.bgGreen(`\n\nListening at http://${host}:${port}\n`))
  app.listen(port)
}
