import * as R from 'ramda'
import * as G from 'graphql'
const {attributeFields, resolver} = require('graphql-sequelize')
const {TEST_ENVS} = require('~/server/config/environments')
const {env} = require('~/server/config/index.js')

import {models} from '~/server/db'

export const mockUsers = [
  {id: 111, facebookId: 'foobar'},
  {id: 222, facebookId: 'bazbar'},
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
