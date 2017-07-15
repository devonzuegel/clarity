const {resolver} = require('graphql-sequelize')

import {models} from '~/server/db'

export default (user?: {id: number}) => {
  if (!user) {
    return resolver(models.Post)
  }
  return models.Post.findAll({where: {userId: user.id}})
}
