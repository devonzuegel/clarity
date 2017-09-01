import * as webpackMerge from 'webpack-merge'
import * as webpack from 'webpack'
import * as path from 'path'

import * as Options from '../models/Options'
import * as Env from '../models/Environment'

export const setup = (env: Env.Type) => {
  const isProd = String(env) === String(Env.Enum.production)

  const options: Options.Interface = {
    rootDir: path.join(__dirname, '../..'),
    outputDir: isProd ? 'dist' : 'build',
    devtool: 'source-map',
    console: !isProd,
    isProd,
  }

  const shared = [
    require('../loaders/woff-loader'),
    require('../loaders/css-loader'),
    require('./partials/base'),
    require('../partials/aliases'),
  ]

  const partials = isProd
    ? [require('../loaders/typescript-loader'), ...shared]
    : [require('../loaders/hot-typescript-loader'), ...shared]
  return webpackMerge(
    ...partials.map((m): webpack.Configuration => m.partial(options))
  )
}
