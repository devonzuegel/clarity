import * as path from 'path'

import { config } from './config'
import * as Env   from '../models/Environment'

export const setup = (env: Env.Type) => {
  const isProd = String(env) === String(Env.Enum.production)

  return config({
    rootDir:   path.join(__dirname, '../..'),
    outputDir: isProd ? 'dist' : 'build',
    devtool:   'source-map',
    console:   !isProd,
  })
}
