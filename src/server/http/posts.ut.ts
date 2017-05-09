import * as express from 'express'
import * as supertest from 'supertest'
import {initSession} from '../../../utils/test/session'
import {MockUserService} from '../service/user.mock'
import {MockPostService} from '../service/post.mock'

jest.mock('../service/user', () => ({
  userService: new MockUserService(),
}))
jest.mock('../service/post', () => ({
  postService: new MockPostService(),
}))

import PostsAPI from './posts'

const app = express()
initSession(app)
PostsAPI(app)

describe('Posts HTTP', () => {
  describe('GET /api/posts', () => {
    it('retrieves list of posts', () => {
      supertest(app)
        .get('/api/posts') // ?username=foobar')
        .then((res) => expect(res.body).toEqual([
          {dataValues: {userId: 1}},
          {dataValues: {userId: 2}},
          {dataValues: {userId: 2}},
        ]))
    })
  })
  describe('/api/posts/create', () => {
    it('returns a created post', () => {
      supertest(app)
        .post('/api/posts/create?username=baz')
        .then((res) => expect(res.body.dataValues).toEqual({userId: 123}))
    })
  })
})


