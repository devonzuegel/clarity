import * as G from 'graphql'

import * as User from '~/server/graphql/schema/users'
import * as Post from '~/server/graphql/schema/posts'
import * as Iteration from '~/server/graphql/schema/iterations'

const graphqlSchema = new G.GraphQLSchema({
  query: new G.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: User.Schema,
      posts: Post.Schema,
      iterations: Iteration.Schema,
    },
  }),
})

export default graphqlSchema
