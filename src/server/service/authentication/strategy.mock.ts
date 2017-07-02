import * as util from 'util'
const passport = require('passport')

import Hermes from '~/../utils/hermes'
const hermes = new Hermes({name: 'server'})

export const Strategy = function Strategy(
    this: any,
    _options: Object,
    verify: Function
) {
    this.name = 'test'
    this.verify = verify
}

util.inherits(Strategy, passport.Strategy)

Strategy.prototype.authenticate = function(this: any, req: any) {
    // TODO: any
    hermes.debug('verify')
    hermes.debug(req.params)
    hermes.debug('')

    this.verify({id: 4321}, (err: any, user: any, info: any) => {
        //TODO any
        if (err) {
            this.error(err)
            return
        }
        if (!user) {
            this.fail(info)
            return
        }
        this.success(user, info)
    })
}
