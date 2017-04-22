import api                          from './api'
import { serveFrontend            } from './serveFrontend'
import { runHotMiddleware, listen } from './middleware'
import { monitorExceptions        } from './exceptionMonitoring'
import { sequelize                } from './db'

const config = require('./config.js')
const app    = require('express')()

app.use(require('helmet')())

monitorExceptions(config)(app)

api(app)
serveFrontend(app)

if (config.env !== 'production') {
  runHotMiddleware(app)
}

sequelize.sync().then(() => listen(app, config))
