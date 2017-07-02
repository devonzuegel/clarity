import * as util from 'util'
const passport = require('passport')
import * as Facebook from 'passport-facebook'

import profileMock from '~/server/service/authentication/profile.mock'

export const Strategy = function Strategy(
  this: any,
  _options: Object,
  verify: Function
) {
  this.name = 'test'
  this.verify = verify
}

util.inherits(Strategy, passport.Strategy)

Strategy.prototype.authenticate = function(this: any, _: any) {
  this.verify(profileMock, (err: any, profile: Facebook.Profile, info: any) => {
    if (err) {
      return this.error(err)
    }
    if (!profile) {
      return this.fail(info)
    }
    this.success(profile, info)
  })
}
