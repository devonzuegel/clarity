import * as express from 'express'

import PostsRouter from '~/server/http/posts'
import GraphqlAPI from '~/server/http/graphql'

export default (app: express.Application) => {
  GraphqlAPI(app)
  app.use('/api/posts', PostsRouter)
}
