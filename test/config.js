const host = 'localhost'
const port = 4000
const env = process.env.NODE_ENV

if (!env) {
  throw Error('Please define NODE_ENV')
}

const url = env === 'ci'
  ? 'http://clarity-tests.herokuapp.com'
  : `http://${host}:${port}`

const logIn = browser =>
  browser
    .url(`${url}/posts`)
    .click(nav.logIn) // App must be running in a test environment
    .waitForElementVisible('#root', 1000)

const nav = {
  logIn: 'a#nav--log-in',
  posts: 'a#nav--document',
  newPost: 'a#nav--plus',
}

module.exports = {
  ci: env === 'ci',
  url,
  logIn,
  nav,
}
