import * as express from 'express'

declare var __OUTPUT_DIR__: boolean // Defined by webpack.DefinePlugin at compile time

export const serveFrontend = (app: express.Application) => {
  const fs   = require('fs')
  const path = require('path')

  app.use('/', express.static(__dirname))

  app.get('*', (_: express.Request, res: express.Response) => {
    const file = path.join(__OUTPUT_DIR__, 'index.html') // TODO: Replace with raw-loader require
    const html = fs.readFileSync(file).toString()
    res.status(200).send(html)
  })
}
