import * as express from 'express'
import * as passport from 'passport'

import Hermes from '~/../utils/hermes'
const logger = new Hermes({name: 'server'})

export const setup = (app: express.Application) => {
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

  app.get('/auth/facebook/failure', (_, res) => {
    logger.info('Facebook OAuth failure')
    res.redirect('/posts')
  })
}
