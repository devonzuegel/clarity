import {IterationInstance} from '../db/models/iteration'


export class MockIterationService {
  all (): Promise<Array<IterationInstance>> {
    return new Promise<Array<IterationInstance>>((resolve: Function, _: Function) => {
      resolve([
        {dataValues: {title: 'title'}},
        {dataValues: {title: 'title', body: 'body'}},
        {dataValues: {title: 'title'}},
      ])
    })
  }
}
