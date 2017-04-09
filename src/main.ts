import * as express from 'express'
import * as chalk   from 'chalk'

const config = require('./config.js')
const app    = express()

app.get('/', (_: express.Request, res: express.Response) => {
  res.send('Hello world')
})

console.info(chalk.black.bgGreen(`\n\nListening at http://${config.host}:${config.port}\n`))
app.listen(config.port)

