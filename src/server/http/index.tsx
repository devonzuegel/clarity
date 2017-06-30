import * as express from 'express'

import UsersAPI from './users'
import PostsRouter from './posts'

export default (app: express.Application) => {
  UsersAPI(app)
  app.use('/api/posts', PostsRouter)
}
