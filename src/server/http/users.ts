import * as express from 'express'

import {jsonError} from '~/../utils/api/requests'

import {userService} from '~/server/service/user'

const router = express.Router()

router.post('/setUsername', async (req: express.Request, res: express.Response) => {
  try {
    const [username, facebookId] = [req.body.username, req.body.facebookId]
    const user = await userService.setUsername(facebookId, username)
    res.status(200).json(user.dataValues.username)
  } catch (e) {
    jsonError(res)(e)
  }
})

export default router
