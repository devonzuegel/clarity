import * as express from 'express'
import * as supertest from 'supertest'
import {initSession} from '../../../utils/test/session'
import {MockUserService} from '../service/user.mock'

jest.mock('../service/user', () => ({
  userService: new MockUserService(),
}))

import UsersAPI from './users'

const app = express()
initSession(app)
UsersAPI(app)

describe('Users HTTP', () => {
  describe('/api/users', () => {
    it('retrieves list of users', () => {
      supertest(app)
        .get('/api/users')
        .then((res) => expect(res.body).toEqual([{username: 'foobar'}]))
    })
  })
  describe('/api/users/create', () => {
    it('returns a created user', () => {
      supertest(app)
        .post('/api/users/create?username=baz')
        .then((res) => expect(res.body).toEqual({username: 'baz'}))
    })
  })
})

