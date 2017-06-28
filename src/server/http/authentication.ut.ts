import * as supertest from 'supertest'

import {initSession} from '~/../utils/test/session'
import {bodyMatches, postWithData} from '~/../utils/http/test'
import {newApp} from '~/../utils/http/newApp'

import {MockUserService} from '~/server/service/user.mock'
import {GuestInstance} from '~/server/db/models/guest'

jest.mock('~/server/service/user', () => ({
  userService: new MockUserService(),
}))

import AuthenticationAPI from './authentication'
const app = newApp([initSession, AuthenticationAPI])

describe('Authentication HTTP', () => {
  describe('/api/signup', () => {
    it('returns successfully', done => {
      const facebookId = 'foobar'
      postWithData(app, '/api/signup', {facebookId}, res => {
        bodyMatches({dataValues: {facebookId}})(res)
        done()
      })
    })

    it('returns successfully', done => {
      const facebookId = 'thisUsernameIsntAvailable'
      postWithData(app, '/api/signup', {facebookId}, res => {
        bodyMatches({message: `Sorry, "${facebookId}" is not available`}, 500)(res)
        done()
      })
    })

    it('returns an error when no facebookId given', done => {
      postWithData(app, '/api/signup', {}, res => {
        bodyMatches({message: `You must provide a facebookId`}, 500)(res)
        done()
      })
    })

    it('returns an error when a null facebookId is given', done => {
      const facebookId = null
      postWithData(app, '/api/signup', {facebookId}, res => {
        bodyMatches({message: `You must provide a facebookId`}, 500)(res)
        done()
      })
    })
  })

  describe('/api/signin', () => {
    it('returns successfully', done => {
      const facebookId = 'foobar'
      postWithData(app, '/api/signin', {facebookId}, res => {
        bodyMatches({dataValues: {facebookId, id: 123}})(res)
        done()
      })
    })

    it('returns an error when no facebookId given', done => {
      postWithData(app, '/api/signin', {}, res => {
        bodyMatches({message: `You must provide a facebookId`}, 500)(res)
        done()
      })
    })

    it('returns an error when a null facebookId is given', done => {
      const facebookId = null
      postWithData(app, '/api/signin', {facebookId}, res => {
        bodyMatches({message: `You must provide a facebookId`}, 500)(res)
        done()
      })
    })

    it('error when the given facebookId does not belong to an existing user', done => {
      const facebookId = 'thisUsernameDoesntExist'
      postWithData(app, '/api/signin', {facebookId}, res => {
        const message = `User with facebookId "thisUsernameDoesntExist" does not exist`
        bodyMatches({message}, 500)(res)
        done()
      })
    })
  })

  describe('/api/session', () => {
    it('returns an error when there is no active session', () => {
      supertest(app).get('/api/session').then(bodyMatches(new GuestInstance()))
    })
  })
})
