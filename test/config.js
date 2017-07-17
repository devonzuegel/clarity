const host = 'localhost'
const port = 4000
const env = process.env.NODE_ENV

if (!env) {
  throw Error('Please define NODE_ENV')
}

const url = env === 'ci'
  ? 'http://clarity-tests.herokuapp.com'
  : `http://${host}:${port}`

const nav = {
  logIn: 'a#nav--log-in',
  posts: 'a#nav--document',
  newPost: 'a#nav--plus',
}

module.exports = {
  ci: env === 'ci',
  url,
  nav,
}
