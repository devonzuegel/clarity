import * as R from 'ramda'
import * as G from 'graphql'
const {attributeFields, resolver} = require('graphql-sequelize')
const {TEST_ENVS} = require('~/server/config/environments')
const {env} = require('~/server/config/index.js')

import {models} from '~/server/db'

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

const Type = new G.GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: attributeFields(models.User),
})

export const Schema = {
  type: new G.GraphQLList(Type),
  args: {
    id: {type: G.GraphQLID},
    facebookId: {type: G.GraphQLString},
  },
  resolve: R.contains(env, TEST_ENVS)
    ? (_: any, _args: {[k: string]: any}) => mockUsers
    : resolver(models.User),
}
