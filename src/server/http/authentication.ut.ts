import * as express from 'express'
import * as supertest from 'supertest'
import * as bodyParser from 'body-parser'

import {initSession} from '../../../utils/test/session'
import {bodyMatches} from '../../../utils/test/results'
import {MockUserService} from '../../server/service/user.mock'
import {GuestInstance} from '../../server/db/models/guest'

jest.mock('../service/user', () => ({
  userService: new MockUserService(),
}))

import AuthenticationAPI from './authentication'

const app = express()

app.use(bodyParser.json())
initSession(app)
AuthenticationAPI(app)

const postWithData = (
  endpoint: string,
  data: Object,
  cb: (r: supertest.Response) => void
) =>
  supertest(app)
    .post(endpoint)
    .send(data)
    .set('Accept', 'application/json')
    .end((_err, res) => cb(res))

describe('Authentication HTTP', () => {
  describe('/api/signup', () => {
    it('returns successfully', done => {
      const facebookId = 'foobar'
      postWithData('/api/signup', {facebookId}, res => {
        bodyMatches({dataValues: {facebookId}})(res)
        done()
      })
    })

    it('returns successfully', done => {
      const facebookId = 'thisUsernameIsntAvailable'
      postWithData('/api/signup', {facebookId}, res => {
        bodyMatches({message: `Sorry, "${facebookId}" is not available`}, 500)(
          res
        )
        done()
      })
    })

    it('returns an error when no facebookId given', done => {
      postWithData('/api/signup', {}, res => {
        bodyMatches({message: `You must provide a facebookId`}, 500)(res)
        done()
      })
    })

    it('returns an error when a null facebookId is given', done => {
      const facebookId = null
      postWithData('/api/signup', {facebookId}, res => {
        bodyMatches({message: `You must provide a facebookId`}, 500)(res)
        done()
      })
    })
  })

  describe('/api/signin', () => {
    it('returns successfully', done => {
      const facebookId = 'foobar'
      postWithData('/api/signin', {facebookId}, res => {
        bodyMatches({dataValues: {facebookId, id: 123}})(res)
        done()
      })
    })

    it('returns an error when no facebookId given', done => {
      postWithData('/api/signin', {}, res => {
        bodyMatches({message: `You must provide a facebookId`}, 500)(res)
        done()
      })
    })

    it('returns an error when a null facebookId is given', done => {
      const facebookId = null
      postWithData('/api/signin', {facebookId}, res => {
        bodyMatches({message: `You must provide a facebookId`}, 500)(res)
        done()
      })
    })

    it('error when the given facebookId does not belong to an existing user', done => {
      const facebookId = 'thisUsernameDoesntExist'
      postWithData('/api/signin', {facebookId}, res => {
        const message = `User with facebookId "thisUsernameDoesntExist" does not exist`
        bodyMatches({message}, 500)(res)
        done()
      })
    })
  })

  describe('/api/session', () => {
    it('returns an error when there is no active session', () => {
      supertest(app).get('/api/session').then(bodyMatches(new GuestInstance()))
    })
  })
})
