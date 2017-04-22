import {UserAttributes, UserInstance} from '../db/models/user'

export class MockUserService {
  create = (attributes: UserAttributes): Promise<UserInstance> =>
    new Promise<UserInstance>((resolve: Function, _: Function) => {
      resolve(attributes)
    })

  all = (): Promise<Array<UserInstance>> =>
    new Promise<Array<UserInstance>>((resolve: Function, _: Function) => {
      resolve([{username: 'foobar'}])
    })
}
