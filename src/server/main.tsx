import * as express                 from 'express'
import { runHotMiddleware, listen } from './middleware'

const config = require('./config.js')
const app    = express()

if (config.env !== 'production') {
  runHotMiddleware(app)
}

app.use('/', express.static(__dirname))

app.get('*', (_: express.Request, res: express.Response) => {
  res.status(200).send(renderHTML())
})

listen(app, config)


function renderHTML() {
  const html: string = `
    <div>
      <div id="root" />
      <script src="/frontend.js"></script>
    </div>
  `
  return `<!doctype html> ${html}`
}
