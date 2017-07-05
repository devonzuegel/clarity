import * as G from 'graphql'
const {attributeFields} = require('graphql-sequelize')
import postsResolver from '~/server/graphql/resolvers/posts'

import {models} from '~/server/db'
import * as Post from '~/server/graphql/schema/posts'
import usersResolver from '~/server/graphql/resolvers/users'

const userResolver = usersResolver

export const Type = new G.GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: {
    ...attributeFields(models.User),
    posts: {
      type: new G.GraphQLList(Post.Type),
      resolve: postsResolver,
    },
  },
})

export const Schema = {
  type: new G.GraphQLList(Type),
  args: {
    id: {type: G.GraphQLID},
    facebookId: {type: G.GraphQLString},
  },
  resolve: userResolver,
}
