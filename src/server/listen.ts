import * as express from 'express'
import * as Chalk from 'chalk'

export const listen = (
  app: express.Application,
  {host, port}: {host: string; port: number}
) => {
  console.info(Chalk.black.bgGreen(`\n\n  Listening at http://${host}:${port}  \n`))
  app.listen(port)
}
