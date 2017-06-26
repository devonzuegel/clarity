import * as express from 'express'
import * as R from 'ramda'
import * as Chalk from 'chalk'
import * as bodyParser from 'body-parser'

import Hermes from '~/../utils/hermes'

import http from './http'
import * as Passport from './passport'
import {runHotMiddleware} from './middleware'
import {listen} from './listen'
import {monitorExceptions} from './exceptionMonitoring'
import {serveFrontend} from './serveFrontend'
import {sequelize} from './db'
import {setupSession} from './session'

const {LOCAL_ENVS} = require('./config/environments')
const config = require('./config/index.js')
const app = express()
const logger = new Hermes({name: 'server'})

app.use(bodyParser.json())
app.use(require('helmet')())

monitorExceptions(config)(app)
setupSession(app) // Must happen before initializing the API
http(app)
Passport.setup(config)(app)

if (R.contains(config.env, LOCAL_ENVS)) {
  logger.print(Chalk.bgBlue.black(`\n\n  Running HMR...  \n`))
  runHotMiddleware(app)
}

serveFrontend(app)

sequelize.sync().then(() => listen(app, config))
