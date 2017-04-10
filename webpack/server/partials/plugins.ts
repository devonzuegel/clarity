import * as webpack from 'webpack'
import * as Options from '../../models/Options'

export const partial = (_: Options.Interface): webpack.Configuration => ({
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

