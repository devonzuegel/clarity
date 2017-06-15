import {randomStr} from '../../../../utils/test/string'
// import {innerText} from '../../../../utils/test/document'
import Nightmare from '../../../../utils/test/nightmare'
import config from '../../../../utils/test/config'

const SIGNIN_URL = `${config.url}/signin`
const NEW_POST_URL = `${config.url}/posts/new`
// const POSTS_URL    = `${config.url}/posts`

const signedInNightmare = () => {
  const facebookId = randomStr()
  const nightmare = Nightmare()
  return nightmare
    .goto(SIGNIN_URL)
    .type('input#signin-form__facebookId', facebookId)
    .click('button#signin-form__signup-button')
}

describe('New post', () => {
  xit('Creates a new post with title and body', done => {
    const title = randomStr()
    const nightmare = signedInNightmare()
    nightmare
      .goto(NEW_POST_URL)
      .type('input#post--new__title', title)
      .click('button#post--new__create-button')
      // .wait('body')
      // .goto(POSTS_URL)
      // .wait('body')
      // .evaluate(innerText(), 'body')
      // // .cookies.get()
      .then((s: string) => {
        nightmare.end()
        expect(s).toEqual('') // TODO: Add title
        done()
      })

    // /** Click [+ Add Post] button **/
    // /** Type a title & body, then submit **/
    // /** View the new post **/
    // .end()
    // .then(() => done())
  })
  xit('Creates a new post with no body', done => {
    const nightmare = signedInNightmare()
    nightmare
      /** Click [+ Add Post] button **/
      /** Type a title, then submit **/
      /** View the new post **/
      .end()
      .then(() => done())
  })
  xit('Rejects a new post with no title', done => {
    const nightmare = signedInNightmare()
    nightmare
      /** Click [+ Add Post] button **/
      /** Click submit **/
      /** You should now see an error saying you need a title **/
      .end()
      .then(() => done())
  })
  xit('Rejects a new post if you are not signed in', done => {
    const nightmare = Nightmare()
    nightmare
      /** Try to go to /posts/new **/
      /** Should result in a 401 **/
      .end()
      .then(() => done())
  })
})
