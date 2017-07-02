import * as path from 'path'
import * as webpack from 'webpack'

import * as Options from 'webpack/models/Options'

export const partial = (c: Options.Interface): webpack.Configuration => ({
  resolve: {
    modules: ['node_modules', path.join(c.rootDir, 'src')],

    /**
     * Though the project's source is in Typescript, we must support Javascript
     * resolution as well, because some node_modules import JS files.
     */
    extensions: ['.tsx', '.ts', '.js', '.jsx'],

    alias: {
      '~': path.resolve('./src'),
    },
  },
})
