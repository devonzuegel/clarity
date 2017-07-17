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
        bodyMatches(
          {message: 'Sorry, username "takenUsername" is not available'},
          500
        )(res)
        done()
      })
    })
    it('handles bad facebookId', async done => {
      const [facebookId, username] = ['thisUsernameDoesntExist', randomStr()]
      postWithData(app, '/api/users/setUsername', {facebookId, username}, res => {
        bodyMatches(
          {message: 'User with facebookId "thisUsernameDoesntExist" does not exist'},
          500
        )(res)
        done()
      })
    })
  })
})
