import * as e6p from 'es6-promise'
(e6p as any).polyfill()
import 'isomorphic-fetch'

// import * as React   from 'react'
import * as express from 'express'
import * as chalk   from 'chalk'
import * as path    from 'path'

const config = require('./config.js')
const app    = express()

app.get('*', (_: express.Request, res: express.Response) => {
  res.status(200).send('<h1>Hello world!</h1>')
})

console.info(chalk.black.bgGreen(`\n\nListening at http://${config.host}:${config.port}\n`))
app.use('/public', express.static(path.join(__dirname, '../build/frontend')))
app.listen(config.port)

