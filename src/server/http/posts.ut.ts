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

import PostsRouter from './posts'

const app = express()
initSession(app)
app.use('/api/posts', PostsRouter)

describe('Posts HTTP', () => {
  describe('GET /api/posts', () => {
    it('retrieves list of posts', async () => {
      const res = await supertest(app).get('/api/posts') // ?facebookId=foobar')
      expect(res.body).toEqual([
        {dataValues: {userId: 1}},
        {dataValues: {userId: 2}},
        {dataValues: {userId: 2}},
      ])
    })
  })

  describe('/api/posts/create', () => {
    it('returns a created post', async () => {
      const res = await supertest(app).post('/api/posts/create?facebookId=baz')
      expect(res.body.dataValues).toEqual({userId: 123})
    })

    it('returns a useful error message when not provided a facebookId', async () => {
      const res = await supertest(app).post('/api/posts/create')
      expect(res.body.dataValues).toEqual({
        message: 'Please provide a facebookId',
      })
    })
  })

  describe('/api/posts/:id', () => {
    const [existentId, nonexistentId] = [1, 2]

    const getIterations = async (id: number) =>
      (await supertest(app).get(`/api/posts/${id}`)).body

    it(`retrieves the post's iterations`, async () => {
      expect(await getIterations(existentId)).toEqual([
        {dataValues: {postId: '1', title: 'Post 1, with no body'}},
        {
          dataValues: {
            postId: '1',
            title: 'Post 2, with body',
            body: 'Body of post 2',
          },
        },
      ])
    })

    it(`error message when id doesn't correspond to a post`, async () => {
      expect(await getIterations(nonexistentId)).toEqual({
        message: 'Cannot find post with id 2',
      })
    })
  })

  describe('/api/posts/:id/iterate', () => {
    const postId = 1
    const iterate = async (id: number) =>
      (await supertest(app).post(`/api/posts/${id}/iterate`)).body

    fit(`creates a new iteration`, async () => {
      expect(await iterate(postId)).toEqual({
        dataValues: {
          ...new MockPostService().mockPost,
          postId,
        },
      })
    })
  })
})
