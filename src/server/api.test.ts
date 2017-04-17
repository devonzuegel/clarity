import * as express from 'express'
import * as supertest from 'supertest'
import {MockUserService} from './service/user.mock'

jest.mock('./service/user', () => ({
  userService: new MockUserService(),
}))

import api from './api'

const app = api(express())

describe('API', () => {
  describe('/users', () => {
    it('retrieves list of users', () => {
      supertest(app)
        .get('/users')
        .then((res) => expect(res.body).toEqual([{username: 'foobar'}]))
    })
  })
  describe('/users/create', () => {
    it('returns a created user', () => {
      supertest(app)
        .get('/users/create?username=baz')
        .then((res) => expect(res.body).toEqual({username: 'baz'}))
    })
  })
})


