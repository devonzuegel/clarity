import * as express from 'express'

import UsersAPI from './users'
import AuthenticationAPI from './authentication'

export default (app: express.Application) => {
  UsersAPI(app)
  AuthenticationAPI(app)
}
