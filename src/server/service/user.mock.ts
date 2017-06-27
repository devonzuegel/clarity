import {UserAttributes, UserInstance} from '~/server/db/models/user'

export class MockUserService {
  findByFacebookId(facebookId: string): Promise<UserInstance> {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      if (!facebookId) {
        reject({message: `Please provide a facebookId`})
      }
      if (facebookId == 'thisUsernameDoesntExist') {
        reject({message: `User with facebookId "${facebookId}" does not exist`})
      }
      resolve({
        dataValues: {facebookId, id: 123},
        get: (key: string) => {
          switch (key) {
            case 'id':
              return 123
            default:
              throw Error(`Value for key "${key}" is undefined on mock user`)
          }
        },
      })
    })
  }

  find(id: number): Promise<UserInstance> {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      if (isNaN(id)) {
        reject({message: `User id must be an integer`})
      }
      if (id === 2) {
        reject({message: `User with id "${2}" does not exist`})
      }
      resolve({
        dataValues: {facebookId: 'fake-fb-id', id},
        get: (key: string) => {
          switch (key) {
            case 'id':
              return 123
            default:
              throw Error(`Value for key "${key}" is undefined on mock user`)
          }
        },
      })
    })
  }

  create(attributes: UserAttributes): Promise<UserInstance> {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      if (attributes.facebookId == 'thisUsernameIsntAvailable') {
        reject({message: `Sorry, "${attributes.facebookId}" is not available`})
      }
      resolve({dataValues: attributes})
    })
  }

  all(): Promise<Array<UserInstance>> {
    return new Promise<Array<UserInstance>>((resolve: Function, _: Function) => {
      resolve([{facebookId: 'foobar'}])
    })
  }
}
