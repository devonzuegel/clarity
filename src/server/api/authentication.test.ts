import * as express from 'express'
import * as supertest from 'supertest'
import {initSession} from '../../../utils/test/session'
import {bodyMatches} from '../../../utils/test/results'
import {MockUserService} from '../service/user.mock'

jest.mock('../service/user', () => ({
  userService: new MockUserService(),
}))

import AuthenticationAPI from './authentication'

const app = express()
initSession(app)
AuthenticationAPI(app)


describe('Authentication API', () => {

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
        .then(bodyMatches({message: 'You must provide a username'}))
    })

    it('returns an error when the given username does not belong to an existing user', () => {
      supertest(app)
        .post('/login?username=thisUsernameDoesntExist')
        .then(bodyMatches({message: 'That user does not exist'}))
    })
  })

})


