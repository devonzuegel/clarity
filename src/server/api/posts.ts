import {UserInstance} from '../db/models/user'
import {PostInstance} from '../db/models/post'
import {userService}  from '../service/user'
import {postService}  from '../service/post'


export const create = (username: string, iteration: {body?: string, title: string}) => (
  new Promise<PostInstance>((resolve: Function, reject: Function) => {
    userService
      .findByUsername(username)
      .then((user: UserInstance) => {
        postService
          .create(user, iteration)
          .then((post: PostInstance) => resolve(post))
      })
      .catch(e => reject(e))
  })
)
