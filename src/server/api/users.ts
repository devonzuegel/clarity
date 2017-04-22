import * as express from 'express'
import {jsonError} from '../../../utils/test/results'
import {userService} from '../service/user'
import {UserInstance} from '../db/models/user'


export default (app: express.Application) => {

  app.get('/data', (_: express.Request, res: express.Response) => {
    res.status(200).json([1, 2, 3])
  })

  app.get('/users', (_: express.Request, res: express.Response) => {
    userService.all()
      .then((users: UserInstance[]) => res.status(200).json(users))
      .catch(jsonError(res))
  })

  app.post('/users/create', (req: express.Request, res: express.Response) => {
    userService.create({username: req.query.username})
      .then((user: UserInstance) => res.status(200).json(user))
      .catch(jsonError(res))
  })

}

