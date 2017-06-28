import {PostInstance} from '~/server/db/models/post'
import {UserInstance} from '~/server/db/models/user'
import {IterationInstance} from '~/server/db/models/iteration'

export class MockPostService {
  public mockPost = {
    postId: 9,
    title: 'Foo Bar Baz',
  }

  create(user: UserInstance, _iteration: {body?: string; title: string}) {
    return new Promise<PostInstance>((resolve, _) => {
      const mock = {dataValues: {userId: user.get('id')}}
      resolve(<PostInstance>mock)
    })
  }

  all() {
    return new Promise<PostInstance[]>((resolve, _) => {
      const baz = [
        {dataValues: {userId: 1}},
        {dataValues: {userId: 2}},
        {dataValues: {userId: 2}},
      ]
      resolve(<PostInstance[]>baz)
    })
  }

  ownedBy(user: UserInstance) {
    return new Promise<PostInstance[]>((resolve, _) => {
      const baz = [
        {dataValues: {userId: user.get('id')}},
        {dataValues: {userId: user.get('id')}},
        {dataValues: {userId: user.get('id')}},
      ]
      resolve(<PostInstance[]>baz)
    })
  }

  iterations(postId: number) {
    return new Promise<IterationInstance[]>((resolve, reject) => {
      if (postId % 2) {
        const mock = [
          {dataValues: {postId, title: 'Post 1, with no body'}},
          {
            dataValues: {
              postId,
              title: 'Post 2, with body',
              body: 'Body of post 2',
            },
          },
        ]
        resolve(<IterationInstance[]>mock)
      } else {
        reject({message: `Cannot find post with id ${postId}`})
      }
    })
  }

  iterate(postId: number, data: {body?: string; title: string}) {
    return new Promise<IterationInstance>(async (resolve, _) => {
      const mock = {dataValues: {...this.mockPost, ...data, postId}}
      resolve(<IterationInstance>mock)
    })
  }
}
