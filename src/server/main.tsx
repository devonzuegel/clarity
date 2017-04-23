import api                   from './api'
import { runHotMiddleware  } from './middleware'
import { listen            } from './listen'
import { monitorExceptions } from './exceptionMonitoring'
import { serveFrontend     } from './serveFrontend'
import { sequelize         } from './db'
import { setupSession      } from './session'

const config = require('./config.js')
const app    = require('express')()

app.use(require('helmet')())

monitorExceptions(config)(app)
api(app)
setupSession(app)

if (config.env !== 'production') {
  runHotMiddleware(app)
}

serveFrontend(app)

sequelize.sync().then(() => listen(app, config))
