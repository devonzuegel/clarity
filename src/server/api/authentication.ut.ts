import {MockUserService} from '../service/user.mock'
import {mockSession} from '../../../utils/test/session'
import {GuestInstance} from '../db/models/guest'

// TODO: refactor to inject the UserService dependency rather than manually mocking it out
jest.mock('../service/user', () => ({
  userService: new MockUserService(),
}))

import {signup, signIn, getCurrentUser, signout} from './authentication'

const equals = (expected: any) => (u: any) => expect(u).toEqual(expected)
const unexpectedSuccess = () => {
  throw Error
}

describe('Authentication API', () => {
  describe('signup', () => {
    it('returns successfully', async () => {
      const user = await signup('foobar', mockSession())
      expect(user.dataValues).toEqual({facebookId: 'foobar'})
    })

    it('rejects an unavailable facebookId', async () => {
      try {
        await signup('thisUsernameIsntAvailable', mockSession())
      } catch (e) {
        expect(e).toEqual({
          message: 'Sorry, "thisUsernameIsntAvailable" is not available',
        })
      }
    })

    it('updates the session to include the `facebookId` key upon successful signup', async () => {
      /**
       * NOTE: Javascript passes objects by shared reference. As a result, we can get side
       * effects like updating the contents of the session object.
       *
       * TODO: Refactor this to return a function that updates the session (rather than
       * mutating the internals of the passed-in session object) in order to avoid side
       * effects.
       */
      const session = mockSession()
      await signup('foobar', session)
      expect(session['facebookId']).toEqual('foobar')
    })

    it('returns an error when no facebookId given', async () => {
      signup(undefined, mockSession())
        .then(unexpectedSuccess)
        .catch(equals({message: 'You must provide a facebookId'}))
    })

    it('returns an error when there is no session', async () => {
      signup('foobar', undefined)
        .then(unexpectedSuccess)
        .catch(equals({message: 'You must initialize the API with a session'}))
    })
  })

  describe('signIn', () => {
    it('returns successfully', async () => {
      const user = await signIn('foobar', mockSession())
      expect(user.dataValues).toEqual({facebookId: 'foobar', id: 123})
    })

    it('updates the session to include the `facebookId` key', async () => {
      /**
       * NOTE: Javascript passes objects by shared reference. As a result, we can get side
       * effects like updating the contents of the session object.
       *
       * TODO: Refactor this to return a function that updates the session (rather than
       * mutating the internals of the passed-in session object) in order to avoid side
       * effects.
       */
      const session = mockSession()
      expect(session['facebookId']).toEqual(undefined)
      signIn('foobar', session).then(_ =>
        expect(session['facebookId']).toEqual('foobar')
      )
    })

    it('returns an error when no facebookId given', async () => {
      signIn(undefined, mockSession())
        .then(unexpectedSuccess)
        .catch(equals({message: 'You must provide a facebookId'}))
    })

    it('returns an error when the given facebookId does not belong to an existing user', async () => {
      signIn('thisUsernameDoesntExist', mockSession())
        .then(unexpectedSuccess)
        .catch(
          equals({
            message:
              'User with facebookId "thisUsernameDoesntExist" does not exist',
          })
        )
    })

    it('returns an error when there is no session', async () => {
      signIn('foobar', undefined)
        .then(unexpectedSuccess)
        .catch(equals({message: 'You must initialize the API with a session'}))
    })
  })

  describe('signout', () => {
    it('returns successfully', async () => {
      const session = {...mockSession(), facebookId: 'foobar'}
      await signout(session)
      expect(session['facebookId']).toEqual(undefined)
    })
  })

  describe('getCurrentUser', async () => {
    it('returns successfully', async () => {
      const user = await getCurrentUser({
        ...mockSession(),
        facebookId: 'foobar',
      })
      expect(user.dataValues).toEqual({facebookId: 'foobar', id: 123})
    })

    it('returns an error when no facebookId is set on the session', async () => {
      const user = await getCurrentUser(mockSession())
      expect(user).toEqual(new GuestInstance())
    })

    it('errors when facebookId on the session does not belong to an existing user', async () => {
      try {
        await getCurrentUser({
          ...mockSession(),
          facebookId: 'thisUsernameDoesntExist',
        })
      } catch (e) {
        const message =
          'User with facebookId "thisUsernameDoesntExist" does not exist'
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
