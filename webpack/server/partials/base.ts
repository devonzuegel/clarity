import * as path    from 'path'
import * as webpack from 'webpack'

import * as Options from '../../models/Options'

export const partial = (c: Options.Interface): webpack.Configuration => ({
  // Take the entry point `src/main.js` and generate a file at `build/backend.js`.
  entry:  './src/main.ts',
  output: {
    path:     path.join(c.rootDir, c.outputDir),
    filename: 'backend.js',
  },

  resolve: {
    extensions: ['.tsx', '.ts']
  },

  devtool: c.devtool,

  target: 'node', // Do not touch any built-in modules (e.g. `fs` or `path`).
})

