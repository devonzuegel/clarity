import * as path    from 'path'
import * as webpack from 'webpack'

import * as Options from '../../models/Options'

export const partial = (c: Options.Interface): webpack.Configuration => ({
  entry: './src/frontend/main.ts',
  output: {
    path:     path.join(c.rootDir, c.outputDir),
    filename: 'frontend.js',
  },
})

