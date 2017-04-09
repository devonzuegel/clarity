import * as path from 'path'

import * as Options from '../models/Options'

export const config: Function = (config: Options.Interface) => ({
  // Take the entry point `src/main.js` and generate a file at `build/backend.js`.
  entry:  './src/main.ts',
  output: {
    path:     path.join(config.rootDir, config.outputDir),
    filename: 'backend.js',
  },

  resolve: {
    extensions: ['.tsx', '.ts']
  },

  module: {
    rules: [
      {
        test:    /\.tsx?$/,
        loader:  'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },

  devtool: config.devtool,

  target: 'node', // Do not touch any built-in modules (e.g. `fs` or `path`).

  externals: require('./externals').nodeModules, // Externals will not be bundled in.
  plugins:   require('./plugins').plugins,
  node:      require('./node').polyfills({ console: config.console }),
})

