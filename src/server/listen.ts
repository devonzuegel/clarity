import * as express from 'express'
import * as Chalk from 'chalk'

import Hermes from '../../utils/hermes'
const logger = new Hermes({name: 'server'})

export const listen = (
  app: express.Application,
  {host, port}: {host: string; port: number}
) => {
  logger.print(Chalk.black.bgGreen(`\n\n  Listening at http://${host}:${port}  \n`))
  app.listen(port)
}
