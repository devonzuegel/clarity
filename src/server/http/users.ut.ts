import * as supertest from 'supertest'
import {initSession} from '~/../utils/test/session'
import {MockUserService} from '~/server/service/user.mock'
import {bodyMatches} from '~/../utils/http/test'
import {newApp} from '~/../utils/http/newApp'

jest.mock('~/server/service/user', () => ({
  userService: new MockUserService(),
}))

import UsersAPI from './users'

const app = supertest(newApp([initSession, UsersAPI]))

describe('Users HTTP', () => {
  describe('/api/users', () => {
    it('retrieves list of users', () => {
      const expected = [{facebookId: 'foobar'}]
      app.get('/api/users').then(bodyMatches(expected))
    })
  })
  describe('/api/users/:id', () => {
    it('retrieves list of users', () => {
      app.get('/api/users/1').then(res =>
        expect(res.body).toEqual({
          dataValues: {facebookId: 'fake-fb-id', id: 1},
        })
      )
    })
    it('retrieves list of users', () => {
      app.get('/api/users/2').then(res =>
        expect(res.body).toEqual({
          message: 'User with id "2" does not exist',
        })
      )
    })
    it('rejects a non-number id', () => {
      app.get('/api/users/xxx').then(res =>
        expect(res.body).toEqual({
          message: 'User id must be an integer',
        })
      )
    })
  })
})
