import * as express from 'express'
import * as supertest from 'supertest'
import {initSession} from '../../../utils/test/session'
import {bodyMatches} from '../../../utils/test/results'
import {MockUserService} from '../service/user.mock'
import {GuestInstance} from '../db/models/guest'

jest.mock('../service/user', () => ({
  userService: new MockUserService(),
}))

import AuthenticationAPI from './authentication'

const app = express()

initSession(app)
AuthenticationAPI(app)


describe('Authentication HTTP', () => {

  describe('/api/signup', () => {
    it('returns successfully', () => {
      const username = 'foobar'
      supertest(app)
        .post(`/api/signup?username=${username}`)
        .then(bodyMatches({username}))
    })

    it('returns successfully', () => {
      const username = 'thisUsernameIsntAvailable'
      supertest(app)
        .post(`/api/signup?username=${username}`)
        .then(bodyMatches({message: `Sorry, "${username}" is not available`}, 500))
    })

    it('returns an error when no username given', () => {
      supertest(app)
        .post('/api/signup')
        .then(bodyMatches({message: 'You must provide a username'}, 500))
      supertest(app)
        .post('/api/signup?username=')
        .then(bodyMatches({message: 'You must provide a username'}, 500))
    })
  })

  describe('/api/signin', () => {
    it('returns successfully', () => {
      const username = 'foobar'
      supertest(app)
        .post(`/api/signIn?username=${username}`)
        .then(bodyMatches({username}))
    })

    it('returns an error when no username given', () => {
      supertest(app)
        .post('/api/signin')
        .then(bodyMatches({message: 'You must provide a username'}, 500))
      supertest(app)
        .post('/api/signin?username=')
        .then(bodyMatches({message: 'You must provide a username'}, 500))
    })

    it('returns an error when the given username does not belong to an existing user', () => {
      supertest(app)
        .post('/api/signin?username=thisUsernameDoesntExist')
        .then(bodyMatches({message: `User with username "thisUsernameDoesntExist" does not exist`}, 500))
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


