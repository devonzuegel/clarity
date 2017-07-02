import * as R from 'ramda'
import * as G from 'graphql'
const {attributeFields, resolver} = require('graphql-sequelize')
const {TEST_ENVS} = require('~/server/config/environments')
const {env} = require('~/server/config/index.js')

import {models} from '~/server/db'

export const mockPosts = [
  {
    id: 1,
    userId: 1,
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363',
  },
]

const Type = new G.GraphQLObjectType({
  name: 'Post',
  description: 'A post',
  fields: attributeFields(models.Post),
})

export const Schema = {
  type: new G.GraphQLList(Type),
  args: {
    id: {type: G.GraphQLID},
    facebookId: {type: G.GraphQLString},
  },
  resolve: R.contains(env, TEST_ENVS) || true
    ? (_: any, _args: {[k: string]: any}) => mockPosts
    : resolver(models.Post),
}
