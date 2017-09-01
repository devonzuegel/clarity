import * as webpack from 'webpack'
import * as Options from 'webpack/models/Options'

export const partial = (c: Options.Interface): webpack.Configuration => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
          mimetype: 'application/font-woff',
          name: './fonts/[hash].[ext]',
          publicPath: `${c.rootDir}/fonts`,
        },
      },
    ],
  },
})
