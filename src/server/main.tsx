import * as express    from 'express'
import * as bodyParser from 'body-parser'

import http                  from './http'
import { runHotMiddleware  } from './middleware'
import { listen            } from './listen'
import { monitorExceptions } from './exceptionMonitoring'
import { serveFrontend     } from './serveFrontend'
import { sequelize         } from './db'
import { setupSession      } from './session'

const config = require('./config.js')
const app    = express()

app.use(bodyParser.json())
app.use(require('helmet')())

monitorExceptions(config)(app)
setupSession(app) // Must happen before initializing the API
http(app)

if (config.env === 'development') {
  runHotMiddleware(app)
}

serveFrontend(app)

sequelize.sync().then(() => listen(app, config))
