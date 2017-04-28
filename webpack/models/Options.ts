import * as Devtool from '../models/Devtool'

export interface Interface {
  rootDir:   string,       // Project root.
  outputDir: string,       // Directory name in which to output build.
  devtool:   Devtool.Type,
  console:   boolean,
  isProd:    boolean,
}
