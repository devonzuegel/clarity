import * as webpack from 'webpack'
import * as path    from 'path'

import * as Devtool from '../models/Devtool'

interface Options {
  rootDir: string,
  devtool: Devtool.Type,
}

export const config: Function = (config: Options) => ({
  // Take the entry point `src/main.js` and generate a file at `build/backend.js`.
  entry:  './src/main.js',
  output: {
    path:     path.join(config.rootDir, 'build'),
    filename: 'backend.js',
  },

  devtool: config.devtool,

  // Tells Webpack to not touch any built-in modules (e.g. `fs` or `path`).
  target: 'node',

  // A module listed as `external` will not be bundled in.
  externals: require('./externals').nodeModules,

  plugins: [
    // Ignore all files on the frontend.
    new webpack.IgnorePlugin(/\.css$/),
    new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop'), // Ignore top-level `require`.


    // Sourcemap stack traces from Node.
    new webpack.BannerPlugin({
      banner:    'require("source-map-support").install();',
      raw:       true,  // Prepend the text as it is (instead of wrapping it in a comment).
      entryOnly: false, // Add the text to all generated files, not just the entry.
    }),
  ],
})

