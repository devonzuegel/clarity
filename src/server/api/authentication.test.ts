import {MockUserService} from '../service/user.mock'
import {mockSession} from '../../../utils/test/session'
import {GuestInstance} from '../db/models/guest'

// TODO: refactor to inject the UserService dependency rather than manually mocking it out
jest.mock('../service/user', () => ({
  userService: new MockUserService(),
}))

import {signup, login, getCurrentUser, logout} from './authentication'

const equals = (expected: any) => (u: any) => expect(u).toEqual(expected)
const unexpectedSuccess = () => { throw Error }

describe('Authentication API', () => {

  describe('signup', () => {
    it('returns successfully', () => {
      signup('foobar', mockSession)
        .then(equals({username: 'foobar'}))
    })

    it('returns successfully', () => {
      signup('thisUsernameIsntAvailable', mockSession)
        .catch(equals({message: 'Sorry, "thisUsernameIsntAvailable" is not available'}))
    })

    it('updates the session to include the `username` key upon successful signup', () => {
      /**
       * NOTE: Javascript passes objects by shared reference. As a result, we can get side
       * effects like updating the contents of the session object.
       *
       * TODO: Refactor this to return a function that updates the session (rather than
       * mutating the internals of the passed-in session object) in order to avoid side
       * effects.
       */
      expect(mockSession['username']).toEqual(undefined)
      signup('foobar', mockSession)
        .then(_ => expect(mockSession['username']).toEqual('foobar'))
    })

    it('returns an error when no username given', () => {
      signup(undefined, mockSession)
        .then(unexpectedSuccess)
        .catch(equals({message: 'You must provide a username'}))
    })

    it('returns an error when there is no session', () => {
      signup('foobar', undefined)
        .then(unexpectedSuccess)
        .catch(equals({message: 'You must initialize the API with a session'}))
    })
  })

  describe('login', () => {
    it('returns successfully', () => {
      login('foobar', mockSession)
        .then(equals({username: 'foobar'}))
    })

    it('updates the session to include the `username` key', () => {
      /**
       * NOTE: Javascript passes objects by shared reference. As a result, we can get side
       * effects like updating the contents of the session object.
       *
       * TODO: Refactor this to return a function that updates the session (rather than
       * mutating the internals of the passed-in session object) in order to avoid side
       * effects.
       */
      expect(mockSession['username']).toEqual(undefined)
      login('foobar', mockSession)
        .then(_ => expect(mockSession['username']).toEqual('foobar'))
    })

    it('returns an error when no username given', () => {
      login(undefined, mockSession)
        .then(unexpectedSuccess)
        .catch(equals({message: 'You must provide a username'}))
    })

    it('returns an error when the given username does not belong to an existing user', () => {
      login('thisUsernameDoesntExist', mockSession)
        .then(unexpectedSuccess)
        .catch(equals({message: 'User with username \"thisUsernameDoesntExist\" does not exist'}))
    })

    it('returns an error when there is no session', () => {
      login('foobar', undefined)
        .then(unexpectedSuccess)
        .catch(equals({message: 'You must initialize the API with a session'}))
    })
  })

  describe('logout', () => {
    it('returns successfully', () => {
      const session = {...mockSession, username: 'foobar'}
      logout(session)
        .then(() => expect(session['username']).toEqual(undefined))
    })
  })

  describe('getCurrentUser', () => {
    it('returns successfully', () => {
      getCurrentUser({...mockSession, username: 'foobar'})
        .then(equals({username: 'foobar'}))
    })

    it('returns an error when no username is set on the session', () => {
      getCurrentUser(mockSession)
        .then(equals(new GuestInstance))
    })

    it('returns an error when the username on the session does not belong to an existing user', () => {
      getCurrentUser({...mockSession, username: 'thisUsernameDoesntExist'})
        .then(unexpectedSuccess)
        .catch(equals({message: 'User with username "thisUsernameDoesntExist" does not exist'}))
    })

    it('returns an error when there is no session', () => {
      getCurrentUser(undefined)
        .then(unexpectedSuccess)
        .catch(equals({message: 'You must initialize the API with a session'}))
    })
  })

})


