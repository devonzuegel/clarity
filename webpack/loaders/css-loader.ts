import * as webpack from 'webpack'
import * as Options from 'webpack/models/Options'


const loaders: webpack.Loader[] = [
  {
    loader: 'style-loader'
  }, {
    loader: 'css-loader',
    options: {
      importLoaders:  2,
      sourceMap:      true,
      modules:        true,
      localIdentName: '[local]___[hash:base64:5]',
    },
  },
]

export const partial = (c: Options.Interface): webpack.Configuration => ({
  module: {
    rules: [
      {
        include: c.rootDir,
        test:    /\.css?$/,
        use:     loaders,
        exclude: /node_modules/,
      },
    ]
  },
})
