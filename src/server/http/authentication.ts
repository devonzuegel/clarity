import * as express from 'express'
import {jsonError, jsonSuccess} from '../../../utils/api/requests'
import {signup, login, logout, getCurrentUser} from '../api/authentication'


export default (app: express.Application) => {

  app.post('/signup', (req: express.Request, res: express.Response) => {
    signup(req.query.username, req.session)
      .then(jsonSuccess(res))
      .catch(jsonError(res))
  })

  app.post('/login', (req: express.Request, res: express.Response) => {
    login(req.query.username, req.session)
      .then(jsonSuccess(res))
      .catch(jsonError(res))
  })

  app.post('/logout', (req: express.Request, res: express.Response) => {
    logout(req.session)
      .then(jsonSuccess(res))
      .catch(jsonError(res))
  })

  app.get('/session', (req: express.Request, res: express.Response) => {
    getCurrentUser(req.session)
      .then(jsonSuccess(res))
      .catch(jsonError(res))
  })

}

