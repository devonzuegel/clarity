import * as webpackMerge from 'webpack-merge'
import * as webpack      from 'webpack'

import * as Options from '../models/Options'

export const config = (options: Options.Interface) => webpackMerge([
  require('../loaders/awesome-typescript-loader'),
  require('./partials/base'),
  require('./partials/externals'),
  require('./partials/plugins'),
  require('./partials/node'),
].map((m): webpack.Configuration => m.partial(options)))
