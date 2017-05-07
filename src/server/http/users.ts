import * as express from 'express'
import {jsonError} from '../../../utils/api/requests'
import {userService} from '../service/user'
import {UserInstance} from '../db/models/user'


export default (app: express.Application) => {

  app.get('/api/users', (_: express.Request, res: express.Response) => {
    userService.all()
      .then((users: UserInstance[]) => res.status(200).json(users))
      .catch(jsonError(res))
  })

  app.post('/api/users/create', (req: express.Request, res: express.Response) => {
    userService.create({username: req.query.username})
      .then((user: UserInstance) => res.status(200).json(user))
      .catch(jsonError(res))
  })

}
