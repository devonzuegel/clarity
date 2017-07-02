import * as G from 'graphql'

import * as Books from '~/server/graphql/books'
import * as User from '~/server/graphql/users'

const graphqlSchema = new G.GraphQLSchema({
  query: new G.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      books: Books.Schema,
      users: User.Schema,
    },
  }),
})

export default graphqlSchema
