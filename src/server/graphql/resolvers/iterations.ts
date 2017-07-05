const {resolver} = require('graphql-sequelize')

import {models} from '~/server/db'

export default (post?: {id: number}) => {
  if (!post) {
    return resolver(models.Iteration)
  }
  return models.Iteration.findAll({where: {postId: post.id}})
}
