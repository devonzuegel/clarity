import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'

import graphqlSchema from '~/server/graphql/schema'

export default (app: express.Application) => {
  app.use('/graphql', graphqlHTTP({schema: graphqlSchema, graphiql: true}))
}
