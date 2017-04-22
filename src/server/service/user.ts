import * as Sequelize from 'sequelize'

import {models} from '../db'
import {UserAttributes, UserInstance} from '../db/models/user'

const failure = (reject: Function) => (error: Sequelize.ValidationError) => {
  console.error(error) // Log full error
  reject(error.errors) // Return only the descriptive .errors array
}

export class UserService {
  create = (attributes: UserAttributes): Promise<UserInstance> => {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      return models.User
        .create(attributes)
        .then((user: UserInstance) => resolve(user))
        .catch(failure(reject))
    })
  }
  all = (): Promise<Array<UserInstance>> => {
    return new Promise<Array<UserInstance>>((resolve: Function, reject: Function) => {
      return models.User
        .findAll()
        .then((products: Array<UserInstance>) => resolve(products))
        .catch(failure(reject))
    })
  }
}

export const userService = new UserService
