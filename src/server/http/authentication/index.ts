import * as R from 'ramda'
import * as express from 'express'
import * as passport from 'passport'

import {IPassportConfig, setupStrategy} from '~/server/service/authentication'
import * as Facebook from '~/server/http/authentication/facebook'
const {TEST_ENVS} = require('~/server/config/environments')
const {env} = require('~/server/config/index.js')

export const setup = (config: IPassportConfig) => (app: express.Application) => {
  setupStrategy(config)

  app.use(passport.initialize())
  app.use(passport.session())

  if (R.contains(env, TEST_ENVS)) {
    Facebook.setup(app)
  } else {
    Facebook.setup(app)
  }
}
