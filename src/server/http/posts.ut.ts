import * as supertest from 'supertest'

import {initSession} from '~/../utils/test/session'
import {postWithData, bodyMatches} from '~/../utils/http/test'
import {newApp} from '~/../utils/http/newApp'

import {MockUserService} from '~/server/service/user.mock'
import {MockPostService} from '~/server/service/post.mock'

jest.mock('~/server/service/user', () => ({
  userService: new MockUserService(),
}))
jest.mock('~/server/service/post', () => ({
  postService: new MockPostService(),
}))

import PostsRouter from './posts'
const app = newApp([initSession, a => a.use('/api/posts', PostsRouter)])

describe('Posts HTTP', () => {
  describe('GET /api/posts', () => {
    it('retrieves list of posts', async () => {
      const res = await supertest(app).get('/api/posts')
      expect(res.body).toEqual([
        {dataValues: {userId: 1}},
        {dataValues: {userId: 2}},
        {dataValues: {userId: 2}},
      ])
    })
  })

  describe('/api/posts/create', () => {
    it('returns the mock data', done => {
      const userId = 123 // From postService mock
      const data = {facebookId: 'baz', title: 'foo'}
      postWithData(app, '/api/posts/create', data, res => {
        bodyMatches({dataValues: {userId}}, 200)(res)
        done()
      })
    })

    it('returns a useful error message when not provided a facebookId', done => {
      postWithData(app, '/api/posts/create', {}, res => {
        bodyMatches({message: 'Please provide a facebookId'}, 500)(res)
        done()
      })
    })
  })

  // TODO: put this under /api/users (flip "posts" & "users")
  describe('/api/posts/users/:facebookId', () => {
    const getPosts = async (facebookId: string) =>
      (await supertest(app).get(`/api/posts/users/${facebookId}`)).body

    it(`retrieves posts belonging to the user`, async () => {
      expect(await getPosts('foobar')).toEqual([
        {dataValues: {userId: 123}},
        {dataValues: {userId: 123}},
        {dataValues: {userId: 123}},
      ])
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

    it(`creates a new iteration`, async () => {
      expect(await iterate(postId)).toEqual({
        dataValues: {
          ...new MockPostService().mockPost,
          postId,
        },
      })
    })
  })
})
