import {models, sequelize} from '../db'
import {UserAttributes, UserInstance} from '../models/user'

class Logger {
  error(_: any) {}
  info(_: any) {}
}
const logger = new Logger()
const failure = (reject: Function) => (error: Error) => {
  logger.error(error.message)
  reject(error)
}

export class UserService {
  create(attributes: UserAttributes): Promise<UserInstance> {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      sequelize.transaction(() =>
        models.User
          .create(attributes)
          .then((user: UserInstance) => {
            logger.info(`Created user with name ${attributes.username}.`)
            resolve(user)
          })
          .catch(failure(reject)),
      )
    })
  }
  all(): Promise<Array<UserInstance>> {
    return new Promise<Array<UserInstance>>((resolve: Function, reject: Function) => {
      sequelize.transaction(() =>
        models.User
          .findAll()
          .then((products: Array<UserInstance>) => {
            logger.info('Retrieved all products.')
            resolve(products)
          })
          .catch(failure(reject)),
      )
    })
  }
}

export const userService = new UserService
