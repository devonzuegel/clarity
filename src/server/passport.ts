import * as express from 'express'
import * as passport from 'passport'
import * as Facebook from 'passport-facebook'

import {userService} from '~/server/service/user'
import {UserInstance} from '~/server/db/models/user'

interface IPassportConfig {
  clientID: string
  clientSecret: string
  callbackURL: string
}

const setupStrategy = (c: IPassportConfig) => {
  passport.use(
    new Facebook.Strategy(c, (_token, _refreshToken, profile, done) => {
      const facebookId = profile.id
      userService
        .signIn(facebookId)
        .then((_u: UserInstance) => done(null, profile))
        .catch((e: any) => done(JSON.stringify(e)))
    })
  )

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))
}

export const setup = (config: IPassportConfig) => (
  app: express.Application
) => {
  setupStrategy(config)

  app.use(passport.initialize())
  app.use(passport.session())

  /**
   * Redirect the user to Facebook for authentication.  When complete,
   * Facebook will redirect the user back to the application at
   *     /auth/facebook/callback
   **/
  app.get('/auth/facebook', passport.authenticate('facebook'))

  /**
   * Facebook will redirect the user to this URL after approval. Finish
   * the authentication process by attempting to obtain an access token.
   * If access was granted, the user will be logged in. Otherwise,
   * authentication has failed.
   **/
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/signin',
      failureRedirect: '/auth/facebook/failure',
    })
  )

  app.get('/auth/facebook/failure', (_, res) =>
    res.send(403).json({
      message: 'Sorry, but we were not able to connect your Facebook account.',
    })
  )

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
const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(403).json({message: 'Please sign in.'})
}
