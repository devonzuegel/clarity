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

  describe('/login', () => {
    it('returns successfully', () => {
      const username = 'foobar'
      supertest(app)
        .post(`/login?username=${username}`)
        .then(bodyMatches({username}))
    })

    it('returns an error when no username given', () => {
      supertest(app)
        .post('/login')
        .then(bodyMatches({message: 'You must provide a username'}, 500))
    })

    it('returns an error when the given username does not belong to an existing user', () => {
      supertest(app)
        .post('/login?username=thisUsernameDoesntExist')
        .then(bodyMatches({message: `User with username "thisUsernameDoesntExist" does not exist`}, 500))
    })
  })

  describe('/session', () => {
    it('returns an error when there is no active session', () => {
      supertest(app)
        .get('/session')
        .then(bodyMatches(new GuestInstance))
    })
  })

})


