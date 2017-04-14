const host = 'localhost'
const port = 4000
const env  = process.env.ENV || 'development'

module.exports = {
  url: (
    env === 'ci'
    ? 'http://clarity-develop.herokuapp.com'
    : `http://${host}:${port}`
  ),
}
