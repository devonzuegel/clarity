import * as express from 'express'
import {jsonError} from '~/../utils/api/requests'
import {userService} from '~/server/service/user'
import {UserInstance} from '~/server/db/models/user'

export default (app: express.Application) => {
  app.get('/api/users', (_: express.Request, res: express.Response) => {
    userService
      .all()
      .then((users: UserInstance[]) => res.status(200).json(users))
      .catch(jsonError(res))
  })

  app.get('/api/users/:id', (req: express.Request, res: express.Response) => {
    userService
      .find(Number(req.params.id))
      .then((user: UserInstance) => res.status(200).json(user))
      .catch(jsonError(res))
  })
}
