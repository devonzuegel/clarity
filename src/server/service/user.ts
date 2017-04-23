import * as Sequelize from 'sequelize'

import {models} from '../db'
import {UserAttributes, UserInstance} from '../db/models/user'
import {MockUserService} from './user.mock'

const sequelizeFailure = (reject: Function) => (error: Sequelize.ValidationError) => {
  console.error(error) // Log full error
  reject(error.errors[0]) // Return only the descriptive .errors array
}

export class UserService extends MockUserService {
  findByUsername(username: string) {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      return models.User
        .findOne({where: {username}})
        .then((user: UserInstance) => resolve(user))
        .catch(sequelizeFailure(reject))
    })
  }

  create(attributes: UserAttributes) {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      return models.User
        .create(attributes)
        .then((user: UserInstance) => resolve(user))
        .catch(sequelizeFailure(reject))
    })
  }

  all() {
    return new Promise<Array<UserInstance>>((resolve: Function, reject: Function) => {
      return models.User
        .findAll()
        .then((users: Array<UserInstance>) => resolve(users))
        .catch(sequelizeFailure(reject))
    })
  }
}

export const userService = new UserService
