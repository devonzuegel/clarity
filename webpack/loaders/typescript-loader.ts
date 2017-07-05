import * as webpack from 'webpack'

const {CheckerPlugin} = require('awesome-typescript-loader')

export const partial = (): webpack.Configuration => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [new CheckerPlugin()],
})
