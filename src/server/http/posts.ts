import * as express from 'express'
import {jsonError} from '../../../utils/api/requests'
import {userService} from '../service/user'
import {postService} from '../service/post'
import {PostInstance} from '../db/models/post'


export default (app: express.Application) => {
  app.get('/api/posts', (_: express.Request, res: express.Response) => {
    postService.all()
      .then((posts: PostInstance[]) => res.status(200).json(posts))
      .catch(jsonError(res))
  })

  app.post('/api/posts/create', (req: express.Request, res: express.Response) => {
    userService.findByUsername(req.query.username).then((user) => {
      const iteration = {
        title: req.query.title,
        body:  req.query.body,
      }
      postService
        .create(user, iteration)
        .then((post: PostInstance) => res.status(200).json(post))
        .catch(jsonError(res))
    })
  })
}

