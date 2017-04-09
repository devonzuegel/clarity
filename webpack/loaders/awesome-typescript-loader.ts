const { CheckerPlugin } = require('awesome-typescript-loader')

export default {
  module: {
    rules: [
      {
        test:    /\.tsx?$/,
        loader:  'awesome-typescript-loader',
        exclude: /node_modules/,
      }
    ]
  },

  plugins: [ new CheckerPlugin() ],
}
