import * as supertest from 'supertest'
import {initSession} from '~/../utils/test/session'
import {MockUserService} from '~/server/service/user.mock'
import {bodyMatches, postWithData} from '~/../utils/http/test'
import {newApp} from '~/../utils/http/newApp'

jest.mock('~/server/service/user', () => ({
  userService: new MockUserService(),
}))

import UsersAPI from './users'

const app = newApp([initSession, UsersAPI])

describe('Users HTTP', () => {
  describe('/api/users', () => {
    it('retrieves list of users', () => {
      supertest(app)
        .get('/api/users')
        .then(res => expect(res.body).toEqual([{facebookId: 'foobar'}]))
    })
  })
  describe('/api/users/create', () => {
    it('returns a created user', done => {
      postWithData(app, '/api/users/create?facebookId=baz', {}, res => {
        bodyMatches({dataValues: {facebookId: 'baz'}}, 200)(res)
        done()
      })
    })
  })
})
