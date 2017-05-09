import * as Sequelize from 'sequelize'

import {models, sequelize} from '../db'
import {PostInstance} from '../db/models/post'
import {MockPostService} from './post.mock'
import {UserInstance} from '../db/models/user'

const sequelizeFailure = (reject: Function) => (error: Sequelize.ValidationError) => {
  console.warn(error) // Log full error
  reject(error) // Return only the descriptive .errors array
  // reject(error.errors[0]) // Return only the descriptive .errors array
}

type IIteration = {body?: string, title: string}

const initPost = (resolve: Function, userId: number, iteration: IIteration) => (
  (t: Sequelize.Transaction) =>
    models.Post
      .create({userId}, {transaction: t})
      .then((post: PostInstance) => (
        models.Iteration
          .create({...iteration, postId: post.dataValues.id})
          .then((_: IIteration) => resolve(post))
      ))
)

export class PostService extends MockPostService {
  create(user: UserInstance, iteration: IIteration) {
    return new Promise<PostInstance>((resolve: Function, reject: Function) => {
      if (!user || !user.get('id')) {
        return reject('Please provide a user')
      }
      return sequelize
        .transaction(initPost(resolve, user.get('id'), iteration))
        .then((post: PostInstance) => resolve(post))
        .catch((err: Error) => reject(err))
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
