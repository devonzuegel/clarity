import * as express from 'express'

import UsersAPI from '~/server/http/users'
import PostsRouter from '~/server/http/posts'
import GraphqlAPI from '~/server/http/graphql'

export default (app: express.Application) => {
  UsersAPI(app)
  GraphqlAPI(app)
  app.use('/api/posts', PostsRouter)
}
