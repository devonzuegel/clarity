import * as express from 'express'

import {jsonError} from '~/../utils/api/requests'
import {userService} from '~/server/service/user'

const router = express.Router()

const getMessage = {
  setUsername: (type: string) => {
    switch (type) {
      case 'unique violation':
        return 'Sorry, that username is not available.'
      case 'blank violation':
        return 'Your username cannot be empty.'
      case 'whitespace violation':
        return 'Please choose a username that does not contain spaces.'
      case 'format violation':
        return (
          'Please choose a username that only contains letters, numbers, ' +
          'dashes, and underscores.'
        )
      case 'user existence violation':
        return 'Oops! Something went wrong. Please try again.'
      default:
        throw Error(`Unexpected error of type "${type}"`)
    }
  },
}

router.post('/setUsername', async (req: express.Request, res: express.Response) => {
  try {
    const [username, facebookId] = [req.body.username, req.body.facebookId]
    const user = await userService.setUsername(facebookId, username)
    res.status(200).json(user.dataValues.username)
  } catch (e) {
    jsonError(res)({message: getMessage.setUsername(e.type)})
  }
})

export default router
