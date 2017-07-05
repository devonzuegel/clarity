import {models} from '~/server/db'

export default (post: {userId: number}) =>
  models.User.findOne({where: {id: post.userId}})
