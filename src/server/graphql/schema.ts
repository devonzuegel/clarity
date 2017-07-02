import * as G from 'graphql'

import * as Books from '~/server/graphql/books'

const graphqlSchema = new G.GraphQLSchema({
  query: new G.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      books: Books.Schema,
    },
  }),
})

export default graphqlSchema
