import * as express from 'express'
import {userService} from './service/user'
import {UserInstance} from './models/user'

export default (app: express.Application) => {

  app.get('/data', (_: express.Request, res: express.Response) => {
    res.status(200).json([1, 2, 3])
  })

  app.get('/users', (_: express.Request, res: express.Response) => {
    userService.all().then((users: UserInstance[]) =>
      res.status(200).json(users),
    )
  })

  app.get('/users/create', (_: express.Request, res: express.Response) => {
    userService.create({username: 'bork'}).then((user: UserInstance) =>
      res.status(200).json(user),
    )
  })

}

