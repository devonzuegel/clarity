import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'

import UsersAPI from '~/server/http/users'
import PostsRouter from '~/server/http/posts'
import graphqlSchema from '~/server/graphql/schema'

export default (app: express.Application) => {
  UsersAPI(app)

  app.use('/api/posts', PostsRouter)
  app.use('/graphql', graphqlHTTP({schema: graphqlSchema, graphiql: true}))
}
