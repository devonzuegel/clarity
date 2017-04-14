import * as path    from 'path'
import * as webpack from 'webpack'

const HtmlWebpackPlugin = require('html-webpack-plugin')

import * as Options from 'webpack/models/Options'

export const partial = (c: Options.Interface): webpack.Configuration => ({
  entry: './src/frontend/main.tsx',
  output: {
    path:     path.join(c.rootDir, c.outputDir),
    filename: 'frontend.js',
  },

  devtool: c.devtool,

  plugins: [
    new HtmlWebpackPlugin({ template: './src/frontend/index.html' }),
  ]
})

