import {IterationInstance} from '~/server/db/models/iteration'

export class MockIterationService {
  all(): Promise<IterationInstance[]> {
    return new Promise<IterationInstance[]>((resolve: Function, _: Function) => {
      resolve([
        {dataValues: {title: 'title'}},
        {dataValues: {title: 'title', body: 'body'}},
        {dataValues: {title: 'title'}},
      ])
    })
  }
}
