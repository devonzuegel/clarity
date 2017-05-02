import {randomStr} from '../../../utils/test/string'
import Nightmare   from '../../../utils/test/nightmare'
import config      from '../../../utils/test/config'

const SIGNIN_URL = `${config.url}/signin`

describe('Sign up', () => {
  it('The signin page should have the expected title', (done) => {
    const nightmare = Nightmare()
    nightmare
      .goto(SIGNIN_URL)
      .evaluate(() => document.title)
      .end()
      .then((s: string) => {
        expect(s).toEqual('') // TODO: Add title
        done()
      })
  })
  it('Submits a valid username', (done) => {
    const username = randomStr()
    const nightmare = Nightmare()
    nightmare
      .goto(SIGNIN_URL)
      .type('input#signup-form__username', username)
      .click('button#signup-form__submit')
      .exists('#signup-form__errors')
      .end()
      .then((elemExists: boolean) => {
        expect(elemExists).toEqual(false)
        done()
      })
  })
})
