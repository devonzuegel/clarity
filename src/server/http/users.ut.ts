import {initSession} from '~/../utils/test/session'
import {postWithData, bodyMatches} from '~/../utils/http/test'
import {newApp} from '~/../utils/http/newApp'
import {randomStr} from '~/../utils/test/string'

import {MockUserService} from '~/server/service/user.mock'
jest.mock('~/server/service/user', () => ({
  userService: new MockUserService(),
}))

import UsersRouter from './users'
const app = newApp([initSession, a => a.use('/api/users', UsersRouter)])

describe('Posts HTTP', () => {
  describe('/api/users/setUsername', () => {
    it('returns the mock data', async done => {
      const username = randomStr()
      const data = {facebookId: randomStr(), username}
      postWithData(app, '/api/users/setUsername', data, res => {
        bodyMatches(username, 200)(res)
        done()
      })
    })
    it('handles non-unique username', async done => {
      const data = {facebookId: randomStr(), username: 'takenUsername'}
      postWithData(app, '/api/users/setUsername', data, res => {
        bodyMatches({message: 'Sorry, that username is not available.'}, 500)(res)
        done()
      })
    })
    it('handles blank username', async done => {
      const data = {facebookId: randomStr(), username: ''}
      postWithData(app, '/api/users/setUsername', data, res => {
        bodyMatches({message: 'Your username cannot be empty.'}, 500)(res)
        done()
      })
    })
    it('handles username containing whitespace', async done => {
      const data = {facebookId: randomStr(), username: 'contains whitespace'}
      postWithData(app, '/api/users/setUsername', data, res => {
        const message = 'Please choose a username that does not contain spaces.'
        bodyMatches({message}, 500)(res)
        done()
      })
    })
    it('handles badly-formatted username', async done => {
      const data = {facebookId: randomStr(), username: 'badFormat!'}
      postWithData(app, '/api/users/setUsername', data, res => {
        const message =
          'Please choose a username that only contains letters, numbers, ' +
          'dashes, and underscores.'
        bodyMatches({message}, 500)(res)
        done()
      })
    })
    it('handles bad facebookId', async done => {
      const [facebookId, username] = ['thisUsernameDoesntExist', randomStr()]
      postWithData(app, '/api/users/setUsername', {facebookId, username}, res => {
        bodyMatches({message: 'Oops! Something went wrong. Please try again.'}, 500)(
          res
        )
        done()
      })
    })
  })
})
