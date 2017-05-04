import * as express from 'express'
import {jsonError, jsonSuccess} from '../../../utils/api/requests'
import {signup, signIn, signout, getCurrentUser} from '../api/authentication'


export default (app: express.Application) => {

  app.post('/api/signup', (req: express.Request, res: express.Response) => {
    signup(req.query.username, req.session)
      .then(jsonSuccess(res))
      .catch(jsonError(res))
  })

  app.post('/api/signin', (req: express.Request, res: express.Response) => {
    signIn(req.query.username, req.session)
      .then(jsonSuccess(res))
      .catch(jsonError(res))
  })

  app.post('/api/signout', (req: express.Request, res: express.Response) => {
    signout(req.session)
      .then(jsonSuccess(res))
      .catch(jsonError(res))
  })

  app.get('/api/session', (req: express.Request, res: express.Response) => {
    getCurrentUser(req.session)
      .then(jsonSuccess(res))
      .catch(jsonError(res))
  })

}

