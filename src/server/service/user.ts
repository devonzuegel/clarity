import * as Sequelize from 'sequelize'

import {models} from '~/server/db'
import {UserInstance} from '~/server/db/models/user'
import {MockUserService} from './user.mock'

const sequelizeFailure = (reject: Function) => (
  error: Sequelize.ValidationError
) => {
  reject(error.errors[0]) // Return only the descriptive .errors array
}

export class UserService extends MockUserService {
  findByFacebookId(facebookId: string) {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      return models.User
        .findOne({where: {facebookId}})
        .then((user: UserInstance) => resolve(user))
        .catch(sequelizeFailure(reject))
    })
  }

  signIn(facebookId: string) {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      return models.User
        .findOrCreate({where: {facebookId}})
        .then(([user, _isNew]: [UserInstance, boolean]) => resolve(user))
        .catch(sequelizeFailure(reject))
    })
  }

  create(attributes: {facebookId: string}) {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      return models.User
        .create(attributes)
        .then((user: UserInstance) => resolve(user))
        .catch(sequelizeFailure(reject))
    })
  }

  all() {
    return new Promise<
      Array<UserInstance>
    >((resolve: Function, reject: Function) => {
      return models.User
        .findAll()
        .then((users: Array<UserInstance>) => resolve(users))
        .catch(sequelizeFailure(reject))
    })
  }
}

export const userService = new UserService()
