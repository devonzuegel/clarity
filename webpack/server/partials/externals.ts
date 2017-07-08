import * as webpack from 'webpack'

const fs = require('fs')

import * as Options from 'webpack/models/Options'
import {StrObject} from 'utils/models'

/**
 * By default, Webpack loads modules from the `node_modules` folder and bundle
 * them in. This is fine for frontend code, but backend modules typically
 * aren't prepared for this (i.e. using require in weird ways) or even worse
 * are binary dependencies.
 *
 * We simply don't want to bundle in anything from node_modules, so we can pass
 * this in to Webpack's `externals` config option.
 */

let nodeModules: StrObject = {}
fs
  .readdirSync('node_modules')
  .filter((x: string) => ['.bin'].indexOf(x) === -1)
  .forEach((mod: string) => {
    nodeModules[mod] = 'commonjs ' + mod
  })

export const partial = (_: Options.Interface): webpack.Configuration => ({
  externals: nodeModules, // Externals will not be bundled in.
})
