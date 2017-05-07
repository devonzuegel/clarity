import {randomStr} from '../../../utils/test/string'
import {innerText} from '../../../utils/test/document'
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
    const username  = randomStr()
    const nightmare = Nightmare()
    nightmare
      /** Initial sign up **/
      .goto(SIGNIN_URL)
      .type('input#signin-form__username', username)
      .click('button#signin-form__signup-button')
      /** There should be no errors **/
      .exists('#signin-form__errors')
      .then((elemExists: boolean) => {
        expect(elemExists).toEqual(false)
        return nightmare
          .wait('a#nav--user')
          .evaluate(innerText(), 'a#nav--user')
          .end()
      })
      /** The username in the top right should show that I'm logged in **/
      .then((s: string) => {
        expect(s).toEqual(username)
        done()
      })
  })

  it('Submits an empty (invalid) username', (done) => {
    const nightmare = Nightmare()
    nightmare
      .goto(SIGNIN_URL)
      .click('button#signin-form__signup-button')
      .wait('#signin-form__errors')
      .evaluate(innerText(), '#signin-form__errors')
      .end()
      .then((text: string) => {
        expect(text).toEqual('Your username cannot be empty.')
        done()
      })
  })

  it('Submit a username that is already taken', (done) => {
    const username  = randomStr()
    const nightmare = Nightmare()
    nightmare
      /** Initial sign up **/
      .goto(SIGNIN_URL)
      .type('input#signin-form__username', username)
      .click('button#signin-form__signup-button')
      /** Log out **/
      .wait('a#nav--sign-out')
      .click('a#nav--sign-out')
      /** Second sign up with same username **/
      .wait('input#signin-form__username')
      .type('input#signin-form__username', username)
      .click('button#signin-form__signup-button')
      .wait('#signin-form__errors')
      .evaluate(innerText(), '#signin-form__errors')
      .end()
      .then((text: string) => {
        expect(text).toEqual(`The username "${username}" is not available`)
        done()
      })
  })

  it('Signs in after previously having signed up', (done) => {
    const username  = randomStr()
    const nightmare = Nightmare()
    nightmare
      /** Initial sign up **/
      .goto(SIGNIN_URL)
      .type('input#signin-form__username', username)
      .click('button#signin-form__signup-button')
      /** Log out **/
      .wait('a#nav--sign-out')
      .click('a#nav--sign-out')
      .wait('a#nav--sign-in')
      /** Second sign up with same username **/
      .type('input#signin-form__username', username)
      .click('button#signin-form__signin-button')
      /** There should be no errors **/
      .exists('#signin-form__errors')
      .then((elemExists: boolean) => {
        expect(elemExists).toEqual(false)
        return nightmare
          .wait('a#nav--user')
          .evaluate(innerText(), 'a#nav--user')
          .end()
      })
      /** The username in the top right should show that I'm logged in **/
      .then((s: string) => {
        expect(s).toEqual(username)
        done()
      })
  })
})
