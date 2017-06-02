import * as express    from 'express'
import * as supertest  from 'supertest'
import * as bodyParser from 'body-parser'

import {initSession}     from '../../../utils/test/session'
import {bodyMatches}     from '../../../utils/test/results'
import {MockUserService} from '../../server/service/user.mock'
import {GuestInstance}   from '../../server/db/models/guest'


jest.mock('../service/user', () => ({
  userService: new MockUserService(),
}))

import AuthenticationAPI from './authentication'

const app = express()

app.use(bodyParser.json())
initSession(app)
AuthenticationAPI(app)

const postWithData = (endpoint: string, data: Object, cb: (r: supertest.Response) => void) =>
  supertest(app)
    .post(endpoint)
    .send(data)
    .set('Accept', 'application/json')
    .end((_err, res) => cb(res))

describe('Authentication HTTP', () => {

  describe('/api/signup', () => {
    it('returns successfully', (done) => {
      const username = 'foobar'
      postWithData('/api/signup', {username}, res => {
        bodyMatches({dataValues: {username}})(res)
        done()
      })
    })

    it('returns successfully', (done) => {
      const username = 'thisUsernameIsntAvailable'
      postWithData('/api/signup', {username}, res => {
        bodyMatches({message: `Sorry, "${username}" is not available`}, 500)(res)
        done()
      })
    })

    it('returns an error when no username given', (done) => {
      postWithData('/api/signup', {}, res => {
        bodyMatches({message: `You must provide a username`}, 500)(res)
        done()
      })
    })

    it('returns an error when a null username is given', (done) => {
      const username = null
      postWithData('/api/signup', {username}, res => {
        bodyMatches({message: `You must provide a username`}, 500)(res)
        done()
      })
    })
  })

  describe('/api/signin', () => {
    it('returns successfully', (done) => {
      const username = 'foobar'
      postWithData('/api/signin', {username}, res => {
        bodyMatches({dataValues: {username, id: 123}})(res)
        done()
      })
    })

    it('returns an error when no username given', (done) => {
      postWithData('/api/signin', {}, res => {
        bodyMatches({message: `You must provide a username`}, 500)(res)
        done()
      })
    })

    it('returns an error when a null username is given', (done) => {
      const username = null
      postWithData('/api/signin', {username}, res => {
        bodyMatches({message: `You must provide a username`}, 500)(res)
        done()
      })
    })

    it('error when the given username does not belong to an existing user', (done) => {
      const username = 'thisUsernameDoesntExist'
      postWithData('/api/signin', {username}, res => {
        const message = `User with username "thisUsernameDoesntExist" does not exist`
        bodyMatches({message}, 500)(res)
        done()
      })
    })
  })

  describe('/api/session', () => {
    it('returns an error when there is no active session', () => {
      supertest(app)
        .get('/api/session')
        .then(bodyMatches(new GuestInstance))
    })
  })

})


