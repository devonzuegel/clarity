import * as G from 'graphql'

import * as Books from '~/server/graphql/books'
import * as User from '~/server/graphql/users'
import * as Post from '~/server/graphql/posts'
import * as Iteration from '~/server/graphql/iterations'

const graphqlSchema = new G.GraphQLSchema({
  query: new G.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      books: Books.Schema,
      users: User.Schema,
      posts: Post.Schema,
      iterations: Iteration.Schema,
    },
  }),
})

export default graphqlSchema
