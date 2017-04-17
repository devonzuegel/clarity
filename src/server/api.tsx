import * as express from 'express'
import {userService} from './service/user'
import {UserInstance} from './models/user'

interface IError {
  message: string
}

const jsonError = (res: express.Response) => (reason: IError) =>
  res.status(400).json(reason)

export default (app: express.Application) => {

  app.get('/data', (_: express.Request, res: express.Response) => {
    res.status(200).json([1, 2, 3])
  })

  app.get('/users', (_: express.Request, res: express.Response) => {
    userService.all()
      .then((users: UserInstance[]) => res.status(200).json(users))
      .catch(jsonError(res))
  })

  app.get('/users/create', (req: express.Request, res: express.Response) => {
    userService.create({username: req.query.username})
      .then((user: UserInstance) => res.status(200).json(user))
      .catch(jsonError(res))
  })

  return app
}

