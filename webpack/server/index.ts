import * as path from 'path'

import { config } from './config'
import * as Env   from '../models/Environment'

const env: Env.Type = Env.Enum.development

const isProd = String(env) === String(Env.Enum.production)

export default config({
  rootDir:   path.join(__dirname, '../..'),
  outputDir: isProd ? 'dist' : 'build',
  devtool:   'sourcemap',
  console:   !isProd,
})
