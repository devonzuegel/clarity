import * as R from 'ramda'
import * as G from 'graphql'
const {attributeFields, resolver} = require('graphql-sequelize')

const {TEST_ENVS} = require('~/server/config/environments')
const {env} = require('~/server/config/index.js')

import {models} from '~/server/db'

export const mockIterations = [
  {
    id: 1,
    postId: 1,
    title: 'First title',
    body: 'First body',
    createdAt: '2017-07-01 01:37:28.363',
  },
  {
    id: 2,
    postId: 1,
    title: 'Second title',
    body: 'Second body',
    createdAt: '2017-07-01 02:37:28.363',
  },
]

const useMocks = R.contains(env, TEST_ENVS)

const iterationResolver = useMocks
  ? (_: any, _args: {[k: string]: any}) => mockIterations
  : resolver(models.Iteration)

export const Type = new G.GraphQLObjectType({
  name: 'Iteration',
  description: 'A iteration',
  fields: attributeFields(models.Iteration),
})

export const Schema = {
  type: new G.GraphQLList(Type),
  resolve: iterationResolver,
}
