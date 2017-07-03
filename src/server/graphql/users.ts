import * as R from 'ramda'
import * as G from 'graphql'
const {attributeFields, resolver} = require('graphql-sequelize')
const {TEST_ENVS} = require('~/server/config/environments')
const {env} = require('~/server/config/index.js')
import {mockPosts} from '~/server/graphql/posts'

import {models} from '~/server/db'
import * as Post from '~/server/graphql/posts'

export const mockUsers = [
  {
    id: 1,
    facebookId: 'foo',
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363',
  },
  {
    id: 2,
    facebookId: 'baz',
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363',
  },
]

const useMocks = R.contains(env, TEST_ENVS)

const postsResolver = (user: {id: number}) => {
  if (useMocks) {
    const belongsTo = ({userId}: {userId: number}) => userId === user.id
    return R.filter(belongsTo, mockPosts)
  }
  return models.Post.findAll({where: {userId: user.id}})
}

const userResolver = useMocks
  ? (_: any, _args: {[k: string]: any}) => mockUsers
  : resolver(models.User)

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
