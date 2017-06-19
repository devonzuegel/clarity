import * as webpack from 'webpack'
import * as Options from 'webpack/models/Options'


const loaders = (c: Options.Interface): webpack.Loader[] => {
  const frontendDir = (path: string = '') =>
    `${c.rootDir}/src/frontend/${path}`

  return [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders:  2,
        sourceMap:      true,
        modules:        true,
        localIdentName: '[local]___[hash:base64:5]',
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          require('postcss-import')({ path: [ frontendDir() ] }),
          require('postcss-cssnext')(),
          require('postcss-assets')({ relative: frontendDir() })
        ],
      },
    },
  ]
}

export const partial = (c: Options.Interface): webpack.Configuration => ({
  module: {
    rules: [
      {
        include: c.rootDir,
        test:    /\.css?$/,
        use:     loaders(c),
        exclude: /node_modules/,
      },
    ]
  },
})
