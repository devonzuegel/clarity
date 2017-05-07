import * as express from 'express'

import UsersAPI from './users'
import PostsAPI from './posts'
import AuthenticationAPI from './authentication'

export default (app: express.Application) => {
  UsersAPI(app)
  PostsAPI(app)
  AuthenticationAPI(app)
}
