import * as G from 'graphql'
const {attributeFields} = require('graphql-sequelize')

import {models} from '~/server/db'
import iterationResolver from '~/server/graphql/resolvers/iterations'

export const Type = new G.GraphQLObjectType({
  name: 'Iteration',
  description: 'A iteration',
  fields: attributeFields(models.Iteration),
})

export const Schema = {
  type: new G.GraphQLList(Type),
  resolve: iterationResolver(),
}
