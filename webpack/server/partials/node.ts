/**
 * Customize the NodeJS environment using polyfills or mocks
 */

import * as webpack from 'webpack'
import * as Options from 'webpack/models/Options'

export const partial = (c: Options.Interface): webpack.Configuration => ({
  node: {
    console: c.console,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
})
