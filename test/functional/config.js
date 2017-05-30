const host = 'localhost'
const port = 4000
const env  = process.env.NODE_ENV || 'development'

module.exports = {
  ci: env === 'ci',
  url: (
    env === 'ci'
    ? 'http://clarity-develop.herokuapp.com'
    : `http://${host}:${port}`
  ),
}
