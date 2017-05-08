import {MockUserService} from '../service/user.mock'
import {mockSession} from '../../../utils/test/session'
import {GuestInstance} from '../db/models/guest'

// TODO: refactor to inject the UserService dependency rather than manually mocking it out
jest.mock('../service/user', () => ({
  userService: new MockUserService(),
}))

import {signup, signIn, getCurrentUser, signout} from './authentication'

const equals = (expected: any) => (u: any) => expect(u).toEqual(expected)
const unexpectedSuccess = () => { throw Error }

describe('Authentication API', () => {

  xdescribe('signup', () => {
    it('returns successfully', () => {
      signup('foobar', mockSession)
        .then(equals({dataValues: {username: 'foobar'}}))
    })

    it('rejects an unavailable username', () => {
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

  xdescribe('signIn', () => {
    it('returns successfully', () => {
      signIn('foobar', mockSession)
        .then(equals({dataValues: {username: 'foobar', id: 123}}))
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
      signIn('foobar', mockSession)
        .then(_ => expect(mockSession['username']).toEqual('foobar'))
    })

    it('returns an error when no username given', () => {
      signIn(undefined, mockSession)
        .then(unexpectedSuccess)
        .catch(equals({message: 'You must provide a username'}))
    })

    it('returns an error when the given username does not belong to an existing user', () => {
      signIn('thisUsernameDoesntExist', mockSession)
        .then(unexpectedSuccess)
        .catch(equals({message: 'User with username \"thisUsernameDoesntExist\" does not exist'}))
    })

    it('returns an error when there is no session', () => {
      signIn('foobar', undefined)
        .then(unexpectedSuccess)
        .catch(equals({message: 'You must initialize the API with a session'}))
    })
  })

  describe('signout', () => {
    it('returns successfully', async () => {
      const session = {...mockSession, username: 'foobar'}
      await signout(session)
      expect(session['username']).toEqual(undefined)
    })
  })

  describe('getCurrentUser', () => {
    it('returns successfully', async () => {
      const user = await getCurrentUser({...mockSession, username: 'foobar'})
      expect(user.dataValues).toEqual({username: 'foobar', id: 123})
    })

    it('returns an error when no username is set on the session', async () => {
      const user = await getCurrentUser(mockSession)
      expect(user).toEqual(new GuestInstance)
    })

    it('errors when username on the session does not belong to an existing user', async () => {
      try {
        await getCurrentUser({...mockSession, username: 'thisUsernameDoesntExist'})
      } catch (e) {
        const message = 'User with username "thisUsernameDoesntExist" does not exist'
        expect(e).toEqual({message})
      }
    })

    it('returns an error when there is no session', async () => {
      try {
        await getCurrentUser(undefined)
      } catch (e) {
        const message = 'You must initialize the API with a session'
        expect(e).toEqual({message})
      }
    })
  })

})


