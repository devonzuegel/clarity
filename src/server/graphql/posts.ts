import * as R from 'ramda'
import * as G from 'graphql'
const {attributeFields, resolver} = require('graphql-sequelize')

const {TEST_ENVS} = require('~/server/config/environments')
const {env} = require('~/server/config/index.js')

import * as Iteration from '~/server/graphql/iterations'
import {models} from '~/server/db'

export const mockPosts = [
  {
    id: 1,
    userId: 1,
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363',
  },
  {
    id: 2,
    userId: 1,
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363',
  },
  {
    id: 3,
    userId: 2,
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363',
  },
]

const useMocks = R.contains(env, TEST_ENVS)

const userResolver = (post: {userId: number}) => {
  if (useMocks) {
    return {id: post.userId}
  }
  return models.User.findOne({where: {id: post.userId}})
}

const iterationsResolver = (post: {id: number}) => {
  if (useMocks) {
    return [
      {
        postId: post.id,
        title: 'x',
        body: 'y',
      },
    ]
  }
  return models.Iteration.findAll({where: {postId: post.id}})
}

export const Type: G.GraphQLObjectType = new G.GraphQLObjectType({
  name: 'Post',
  description: 'A post',
  fields: () => {
    /**
     * User must be required in the callback to handle the circular dependency.
     * More: stackoverflow.com/questions/42531322/graphql-circular-dependency
     **/
    const User = require('~/server/graphql/users')
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
    facebookId: {type: G.GraphQLString},
  },
  resolve: R.contains(env, TEST_ENVS)
    ? (_: any, _args: {[k: string]: any}) => mockPosts
    : resolver(models.Post),
}
