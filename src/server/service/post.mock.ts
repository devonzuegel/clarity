import {PostInstance} from '../db/models/post'
import {UserInstance} from '../db/models/user'


export class MockPostService {
  create (user: UserInstance): Promise<PostInstance> {
    return new Promise<PostInstance>((resolve: Function, _: Function) => {
      resolve({dataValues: {userId: user.dataValues.id}})
    })
  }

  all (): Promise<Array<PostInstance>> {
    return new Promise<Array<PostInstance>>((resolve: Function, _: Function) => {
      resolve([
        {dataValues: {userId: 1}},
        {dataValues: {userId: 2}},
        {dataValues: {userId: 2}},
      ])
    })
  }
}
