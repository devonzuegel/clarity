import * as passport from 'passport'
import * as Facebook from 'passport-facebook'

import {userService} from '~/server/service/user'
import {UserInstance} from '~/server/db/models/user'
const Mock = require('~/server/service/authentication/mock')
const {mockAuthentication} = require('~/server/config/index.js')

export interface IPassportConfig {
  clientID: string
  clientSecret: string
  callbackURL: string
}

const signInCallback = (
  profile: Facebook.Profile,
  done: (_e: any, user?: Facebook.Profile) => void
) => {
  const facebookId = profile.id
  userService
    .signIn(facebookId)
    .then((_u: UserInstance) => done(null, profile))
    .catch((e: any) => done(JSON.stringify(e)))
}

const setupFacebookStrategy = (options: IPassportConfig) => {
  const fbStrategy = new Facebook.Strategy(options, (_t, _rt, profile, done) => {
    signInCallback(profile, done)
  })
  passport.use(fbStrategy)
}

const setupMockStrategy = (options: IPassportConfig) => {
  const mockStrategy = new Mock.Strategy(options, signInCallback)
  passport.use(mockStrategy)
}

export const setupStrategy = (options: IPassportConfig) => {
  if (mockAuthentication) {
    setupMockStrategy(options)
  } else {
    setupFacebookStrategy(options)
  }

  /**
   * Determines which data of the user object should be stored in the session.
   * The result of the serializeUser method is attached to the session as
   * req.session.passport.user.
   **/
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  /**
   * The first argument of deserializeUser corresponds to the key of the user
   * object that was given to the done function. So your whole object is
   * retrieved with help of that key. That key here is the user id (key can
   * be any key of the user object i.e. name, email etc). In deserializeUser
   * that key is matched with the in memory array / database or any data resource.
   **/
  passport.deserializeUser((user, done) => {
    done(null, user)
  })
}
