import * as webpack from 'webpack'
import * as Options from 'webpack/models/Options'

export const partial = (c: Options.Interface): webpack.Configuration => ({
  plugins: [
    // Ignore all files on the frontend.
    new webpack.IgnorePlugin(/\.css$/),
    new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop'), // Ignore top-level `require`.

    // Sourcemap stack traces from Node.
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true, // Prepend the text as it is (instead of wrapping it in a comment).
      entryOnly: false, // Add the text to all generated files, not just the entry.
    }),

    /* Define global constants, configured at compile time.
     *
     * More info:
     *   blog.johnnyreilly.com/2016/07/using-webpacks-defineplugin-with-typescript.html
     */
    new webpack.DefinePlugin({
      /* We need to pass in the output root dir so that we know where to
       * retrieve assets.
       *
       * Note: HtmlWebpackPlugin uses the `output.publicPath` set in the
       * Webpack config to prepend the urls of the injects.
       *
       * More info:
       *   stackoverflow.com/questions/34620628/htmlwebpackplugin-injects-
       *   relative-path-files-which-breaks-when-loading-non-root
       */
      __OUTPUT_DIR__: JSON.stringify(c.outputDir),
    }),
  ],
})
