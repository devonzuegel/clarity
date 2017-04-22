import {UserAttributes, UserInstance} from '../db/models/user'

export class MockUserService {
  findByUsername (username: string): Promise<UserInstance> {
    return new Promise<UserInstance>((resolve: Function, reject: Function) => {
      if (username == 'thisUsernameDoesntExist') {
        reject({message: 'That user does not exist'})
      }
      resolve({username})
    })
  }

  create (attributes: UserAttributes): Promise<UserInstance> {
    return new Promise<UserInstance>((resolve: Function, _: Function) => {
      resolve(attributes)
    })
  }

  all (): Promise<Array<UserInstance>> {
    return new Promise<Array<UserInstance>>((resolve: Function, _: Function) => {
      resolve([{username: 'foobar'}])
    })
  }
}
