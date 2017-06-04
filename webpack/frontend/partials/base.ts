import * as path    from 'path'
import * as webpack from 'webpack'

const HtmlWebpackPlugin = require('html-webpack-plugin')

import * as Options from 'webpack/models/Options'

const entryFile = './src/frontend/main.tsx'
export const partial = (c: Options.Interface): webpack.Configuration => ({
  entry: (
    c.isProd
    ? entryFile
    : {
      app: ['webpack-hot-middleware/client?reload=true', entryFile],
    }
  ),

  output: {
    path:       path.join(c.rootDir, c.outputDir),
    filename:   'frontend.js',
    publicPath: '/', // Prepended to urls injected by HtmlWebpackPlugin
  },

  devtool: c.devtool,

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // ...(c.isProd ? [] : [new webpack.HotModuleReplacementPlugin()]),
    new HtmlWebpackPlugin({ template: './src/frontend/index.html' }),
  ]
})

