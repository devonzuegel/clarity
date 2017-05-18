import * as express from 'express'
import {jsonError} from '../../../utils/api/requests'
import {userService} from '../service/user'
import {postService} from '../service/post'


const router = express.Router()

router.get('/', async (_: express.Request, res: express.Response) => {
  try {
    const posts = await postService.all()
    res.status(200).json(posts)
  } catch (e) {
    jsonError(res)(e)
  }
})

router.post('/create', async (req: express.Request, res: express.Response) => {
  console.log(JSON.stringify(req.query))
  try {
    const user = await userService.findByUsername(req.query.username)
    const post = await postService.create(user, {
      title: req.query.title,
      body:  req.query.body,
    })
    res.status(200).json(post)
  } catch (e) {
    jsonError(res)(e)
  }
})

router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const iterations = await postService.iterations(req.params.id)
    res.status(200).json(iterations)
  } catch (e) {
    jsonError(res)(e)
  }
})

router.post('/:id/iterate', async (req: express.Request, res: express.Response) => {
  try {
    console.log(req.query)
    const iteration = await postService.iterate(req.params.id, req.query)
    res.status(200).json(iteration)
  } catch (e) {
    jsonError(res)(e)
  }
})

export default router
