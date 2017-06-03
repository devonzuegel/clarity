import * as webpack from 'webpack'


export const partial = (): webpack.Configuration => ({
  module: {
    rules: [
      {
        test:    /\.css?$/,
        loaders: [
          'style-loader',
          'css-loader',
        ],
        exclude: /node_modules/,
      }
    ]
  },
})
