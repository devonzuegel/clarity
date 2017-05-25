import {UserAttributes, UserInstance} from '../db/models/user'

export class MockUserService {
  findByUsername (username: string): Promise<UserInstance> {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      if (!username) {
        reject({message: `Please provide a username`})
      }
      if (username == 'thisUsernameDoesntExist') {
        reject({message: `User with username "${username}" does not exist`})
      }
      resolve({
        dataValues: {username, id: 123},
        get: (key: string) => {
          switch (key) {
            case 'id': return 123
            default:   throw Error(`Value for key "${key}" is undefined on mock user`)
          }
        },
      })
    })
  }

  create (attributes: UserAttributes): Promise<UserInstance> {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      if (attributes.username == 'thisUsernameIsntAvailable') {
        reject({message: `Sorry, "${attributes.username}" is not available`})
      }
      resolve({dataValues: attributes})
    })
  }

  all (): Promise<Array<UserInstance>> {
    return new Promise<Array<UserInstance>>((resolve: Function, _: Function) => {
      resolve([{username: 'foobar'}])
    })
  }
}
