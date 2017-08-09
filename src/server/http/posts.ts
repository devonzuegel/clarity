import * as express from 'express'

import {jsonError} from '~/../utils/api/requests'

import {userService} from '~/server/service/user'
import {postService} from '~/server/service/post'

const router = express.Router()

router.get('/', async (_: express.Request, res: express.Response) => {
  try {
    const posts = await postService.all()
    res.status(200).json(posts)
  } catch (e) {
    jsonError(res)(e)
  }
})

router.get(
  '/users/:facebookId',
  async (req: express.Request, res: express.Response) => {
    try {
      const user = await userService.findByFacebookId(req.params.facebookId)
      const posts = await postService.ownedBy(user)
      res.status(200).json(posts)
    } catch (e) {
      jsonError(res)(e)
    }
  }
)

router.post('/create', async (req: express.Request, res: express.Response) => {
  try {
    const user = await userService.findByFacebookId(req.body.facebookId)
    const iteration = {title: req.body.title, body: req.body.body}
    const post = await postService.create(user, iteration, req.body.slug)
    res.status(200).json(post)
  } catch (e) {
    jsonError(res)(e)
  }
})

router.post('/:id/iterate', async (req: express.Request, res: express.Response) => {
  try {
    const postId = Number(req.params.id)
    const iteration = await postService.iterate(postId, req.body)
    res.status(200).json(iteration)
  } catch (e) {
    jsonError(res)(e)
  }
})

export default router
