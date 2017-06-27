import * as bodyParser from 'body-parser'
import * as express from 'express'

type IIntializer = (a: express.Application) => void

export const newApp = (initalizers: IIntializer[]) => {
  const app = express()
  app.use(bodyParser.json())
  initalizers.map(i => i(app))
  return app
}
;('~/../utils/http/newApp')
