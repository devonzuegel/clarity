import * as express from 'express'

import PostsRouter from '~/server/http/posts'
import UsersRouter from '~/server/http/users'
import GraphqlAPI from '~/server/http/graphql'

export default (app: express.Application) => {
  GraphqlAPI(app)
  app.use('/api/posts', PostsRouter)
  app.use('/api/users', UsersRouter)
}
