import * as R from 'ramda'
import {sequelize} from '~/server/db'
import {userService} from '~/server/service/user'
import {randomStr} from '~/../utils/test/string'

const cleanup = (cb: Function) => async (done: Function) => {
  sequelize
    .transaction(async t => {
      await cb()
      return t.rollback()
    })
    .catch(e => {
      if (!R.equals(R.keys(e), [])) throw e
      done()
    })
}

describe('User Service', () => {
  describe('#setUsername', () => {
    it(
      'sets a valid username',
      cleanup(async () => {
        // Create user
        const facebookId = randomStr()
        const user = await userService.signIn(facebookId)
        expect(user.dataValues.username).toEqual(null)

        // Update username
        const username = randomStr()
        const updatedUser = await userService.setUsername(facebookId, username)
        expect(updatedUser.dataValues.username).toEqual(username)
      })
    )
    it(
      'rejects a taken username',
      cleanup(async () => {
        // Create user with username
        const facebookId1 = randomStr()
        const username = randomStr()
        await userService.signIn(facebookId1)
        await userService.setUsername(facebookId1, username)

        // Create second user
        const facebookId2 = randomStr()
        await userService.signIn(facebookId2)

        // Assert that the assertion in the `catch` is in fact run
        expect.assertions(1)
        try {
          await userService.setUsername(facebookId2, username)
        } catch (e) {
          expect(e).toEqual({
            message: 'username must be unique',
            type: 'unique violation',
            path: 'username',
            value: username,
          })
        }
      })
    )

    it(
      'rejects an empty username',
      cleanup(async () => {
        // Create user with username
        const facebookId = randomStr()
        const username = ''
        await userService.signIn(facebookId)

        // Assert that the assertion in the `catch` is in fact run
        expect.assertions(1)
        try {
          await userService.setUsername(facebookId, username)
        } catch (e) {
          expect(e).toEqual({message: 'Your username cannot be empty.'})
        }
      })
    )
  })

  afterAll(() => sequelize.close())
})
