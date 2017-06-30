import * as express from 'express'
import * as passport from 'passport'

import {IPassportConfig, setupStrategy} from '~/server/service/authentication'
import * as Facebook from '~/server/http/authentication/facebook'

export const setup = (config: IPassportConfig) => (app: express.Application) => {
  setupStrategy(config)

  app.use(passport.initialize())
  app.use(passport.session())

  Facebook.setup(app)
}
