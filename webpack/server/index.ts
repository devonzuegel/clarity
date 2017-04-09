import * as path from 'path'

import { config       } from './config'
import * as Environment from '../models/Environment'

const env: Environment.Type = Environment.Enum.production

const node = {
  console: env !== Environment.Enum.production,
}

export default config({
  rootDir: path.join(__dirname, '../..'),
  devtool: 'sourcemap',
  node,
})
