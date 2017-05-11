import * as Sequelize from 'sequelize'

import {models, sequelize} from '../db'
import {PostInstance} from '../db/models/post'
import {MockPostService} from './post.mock'
import {UserInstance} from '../db/models/user'
import {IterationInstance} from '../db/models/iteration'


const sequelizeFailure = (reject: Function) => (error: Sequelize.ValidationError) => {
  console.warn(error) // Log full error
  reject(error) // Return only the descriptive .errors array
  // reject(error.errors[0]) // Return only the descriptive .errors array
}

type IIteration = {body?: string, title: string}

const initPost = (resolve: Function, userId: number, iteration: IIteration) => (
  async (t: Sequelize.Transaction) => {
    const post: PostInstance = await models.Post.create({userId}, {transaction: t})
    await models.Iteration.create({...iteration, postId: post.get('id')})
    resolve(post)
  }
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
    return new Promise<PostInstance[]>((resolve: Function, reject: Function) => {
      return models.Post
        .findAll()
        .then((posts: PostInstance[]) => resolve(posts))
        .catch(sequelizeFailure(reject))
    })
  }

  iterations (postId: number) {
    return new Promise<IterationInstance[]>(async (resolve, _reject) => {
      const iterations = await models.Iteration.findAll({where: {postId}})
      resolve(iterations)
    })
  }

  comments (iterationId: number) {
    return new Promise<IterationInstance[]>(async (resolve, _reject) => {
      iterationId
      resolve([])
    })
  }
}

export const postService = new PostService
