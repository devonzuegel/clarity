import * as path from 'path'

interface Options {
  rootDir: string
}

export const config: Function = (config: Options) => ({
  // Take the entry point `src/main.js` and generate a file at `build/backend.js`.
  entry:  './src/main.js',
  output: {
    path:     path.join(config.rootDir, 'build'),
    filename: 'backend.js',
  },

  // Tells Webpack to not touch any built-in modules (e.g. `fs` or `path`).
  target: 'node',

  // A module listed as `external` will not be bundled in.
  externals: require('./externals').nodeModules,
})

