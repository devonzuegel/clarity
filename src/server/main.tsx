import * as express from 'express'
import { runHotMiddleware, listen } from './middleware'

const fs     = require('fs')
const path   = require('path')
const config = require('./config.js')
const app    = express()

app.use(require('helmet')())

if (config.env !== 'production') {
  runHotMiddleware(app)
}

app.use('/', express.static(__dirname))

app.get('/data', (_: express.Request, res: express.Response) => {
  res.status(200).json([1, 2, 3])
})

app.get('*', (_: express.Request, res: express.Response) => {
  const file = path.join(__dirname, 'index.html') // TODO: Replace with raw-loader require
  const html = fs.readFileSync(file).toString()
  res.status(200).send(html)
})

listen(app, config)
