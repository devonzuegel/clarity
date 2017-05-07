import * as Sequelize from 'sequelize'

import {models} from '../db'
import {PostInstance} from '../db/models/post'
import {MockPostService} from './post.mock'
import {UserInstance} from '../db/models/user'

const sequelizeFailure = (reject: Function) => (error: Sequelize.ValidationError) => {
  console.error(error) // Log full error
  reject(error.errors[0]) // Return only the descriptive .errors array
}

export class PostService extends MockPostService {
  create(user: UserInstance) {
    return new Promise<PostInstance>((resolve: Function, reject: Function) => {
      return models.Post
        .create({userId: user.dataValues.id})
        .then((post: PostInstance) => resolve(post))
        .catch(sequelizeFailure(reject))
    })
  }

  all() {
    return new Promise<Array<PostInstance>>((resolve: Function, reject: Function) => {
      return models.Post
        .findAll()
        .then((posts: Array<PostInstance>) => resolve(posts))
        .catch(sequelizeFailure(reject))
    })
  }
}

export const postService = new PostService
