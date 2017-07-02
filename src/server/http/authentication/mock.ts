import * as express from 'express'
import * as passport from 'passport'

export const setup = (app: express.Application) => {
  app.get('/auth/facebook', passport.authenticate('test'), (_, res) => {
    res.redirect('/signin')
  })
}
