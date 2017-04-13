import * as express                 from 'express'
import { runHotMiddleware, listen } from './middleware'

const config = require('./config.js')
const app    = express()

app.use(require('helmet')())

if (config.env !== 'production') {
  runHotMiddleware(app)
}

app.use('/', express.static(__dirname))

app.get('/', (_: express.Request, res: express.Response) => {
  res.status(200).send(renderHTML())
})

app.get('/data', (_: express.Request, res: express.Response) => {
  res.status(200).json([1, 2, 3])
})

listen(app, config)


function renderHTML() {
  const html: string = `
    <div>
      <div id="root" />
      <script src="/frontend.js"></script>

      <!-- CDN assets for Palantir's Blueprint UI Kit -->
      <link href="https://unpkg.com/normalize.css@^4.1.1" rel="stylesheet" />
      <link href="https://unpkg.com/@blueprintjs/core@^1.11.0/dist/blueprint.css" rel="stylesheet" />
      <script src="https://unpkg.com/classnames@^2.2"></script>
      <script src="https://unpkg.com/tether@^1.4"></script>
      <script src="https://unpkg.com/react@^15.3.1/dist/react-with-addons.min.js"></script>
      <script src="https://unpkg.com/react-dom@^15.3.1/dist/react-dom.min.js"></script>
      <script src="https://unpkg.com/@blueprintjs/core@^1.11.0"></script>
    </div>
  `
  return `<!doctype html> ${html}`
}
