import * as G from 'graphql'
const {attributeFields} = require('graphql-sequelize')

import * as Iteration from '~/server/graphql/schema/iterations'
import {models} from '~/server/db'
import userResolver from '~/server/graphql/resolvers/user'
import iterationsResolver from '~/server/graphql/resolvers/iterations'
import postsResolver from '~/server/graphql/resolvers/posts'

export const Type: G.GraphQLObjectType = new G.GraphQLObjectType({
  name: 'Post',
  description: 'A post',
  fields: () => {
    /**
     * User must be required in the callback to handle the circular dependency.
     * More: stackoverflow.com/questions/42531322/graphql-circular-dependency
     **/
    const User = require('~/server/graphql/schema/users')
    return {
      ...attributeFields(models.Post),
      user: {
        type: User.Type,
        resolve: userResolver,
      },
      iterations: {
        type: new G.GraphQLList(Iteration.Type),
        resolve: iterationsResolver,
      },
    }
  },
})

export const Schema = {
  type: new G.GraphQLList(Type),
  args: {
    id: {type: G.GraphQLID},
    slug: {type: G.GraphQLString},
  },
  resolve: postsResolver(),
}
