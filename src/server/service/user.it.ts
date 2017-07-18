import {sequelize} from '~/server/db'
import {userService} from '~/server/service/user'
import {randomStr} from '~/../utils/test/string'
import {cleanup} from '~/../utils/test/sequelize'

const transaction = cleanup(sequelize)

describe('User Service', () => {
  describe('#setUsername', () => {
    it(
      'sets a valid username',
      transaction(async () => {
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
      transaction(async () => {
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
      transaction(async () => {
        // Create user with username
        const facebookId = randomStr()
        const username = ''
        await userService.signIn(facebookId)

        // Assert that the assertion in the `catch` is in fact run
        expect.assertions(1)
        try {
          await userService.setUsername(facebookId, username)
        } catch (e) {
          expect(e).toEqual({type: 'blank violation'})
        }
      })
    )

    it(
      'rejects non-existent user',
      transaction(async () => {
        expect.assertions(1)
        try {
          await userService.setUsername(randomStr(), randomStr())
        } catch (e) {
          expect(e).toEqual({type: 'user existence violation'})
        }
      })
    )
    it(
      'rejects a username containing whitespace',
      transaction(async () => {
        expect.assertions(1)
        try {
          await userService.setUsername(randomStr(), 'this has whitespace')
        } catch (e) {
          expect(e).toEqual({type: 'whitespace violation'})
        }
      })
    )
    it(
      'rejects a username containing a newline',
      transaction(async () => {
        expect.assertions(1)
        try {
          await userService.setUsername(randomStr(), 'thishasanewline\n')
        } catch (e) {
          expect(e).toEqual({type: 'whitespace violation'})
        }
      })
    )
    it(
      'rejects a username that contains non-alphanumeric/dash/underscores',
      transaction(async () => {
        expect.assertions(1)
        try {
          await userService.setUsername(randomStr(), '!!!!')
        } catch (e) {
          expect(e).toEqual({type: 'format violation'})
        }
      })
    )
    it(
      'rejects a username that contains non-alphanumeric/dash/underscores',
      transaction(async () => {
        // Create user with username
        const facebookId = randomStr()
        await userService.signIn(facebookId)

        // Assert that the assertion in the `catch` is in fact run
        expect.assertions(1)
        try {
          await userService.setUsername(facebookId, 'x.y.z')
        } catch (e) {
          expect(e).toEqual({type: 'format violation'})
        }
      })
    )
  })

  afterAll(() => sequelize.close())
})
