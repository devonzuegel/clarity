import * as express from 'express'
import * as passport from 'passport'

import {IPassportConfig, setupStrategy} from '~/server/service/authentication'
import * as Facebook from '~/server/http/authentication/facebook'
import * as Mock from '~/server/http/authentication/mock'
const {mockAuthentication} = require('~/server/config/index.js')

export const setup = (config: IPassportConfig) => (app: express.Application) => {
  setupStrategy(config)

  app.use(passport.initialize())
  app.use(passport.session())

  if (mockAuthentication) {
    Mock.setup(app)
  } else {
    Facebook.setup(app)
  }

  app.get('/api/profile', isLoggedIn, (req, res) => {
    res.json(req.user)
  })

  app.get('/api/signout', isLoggedIn, (req, res) => {
    req.logout()
    res.redirect('/')
  })
}

/**
 * Route middleware to make sure a user is logged in
 **/
const isLoggedIn = (req: express.Request, res: express.Response, next: Function) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(403).json({message: 'Please sign in.'})
}
