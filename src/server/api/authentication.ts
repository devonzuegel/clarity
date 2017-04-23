import * as express from 'express'
import {jsonError} from '../../../utils/api'
import {userService} from '../service/user'
import {UserInstance} from '../db/models/user'


export default (app: express.Application) => {

  app.post('/login', (req: express.Request, res: express.Response) => {
    if (!req.query.username) {
      return jsonError(res)({message: 'You must provide a username'})
    }

    userService
      .findByUsername(req.query.username)
      .then((user: UserInstance) => {
        if (!req.session) {
          return jsonError(res)({message: 'You must initialize the API with a session'})
        }
        req.session['username'] = req.query.username
        return res.status(200).json(user)
      })
      .catch(jsonError(res))
  })

}

