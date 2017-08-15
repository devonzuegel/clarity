const host = 'localhost'
const port = 4000
const env = process.env.NODE_ENV

if (!env) {
  throw Error('Please define NODE_ENV')
}

const url = `http://${host}:${port}`

const nav = {
  logIn: 'a#nav--log-in',
  userProfile: 'a#nav--user',
  posts: 'a#nav--document',
  newPost: 'a#nav--plus',
}

module.exports = {
  ci: env === 'ci',
  url,
  nav,
}
