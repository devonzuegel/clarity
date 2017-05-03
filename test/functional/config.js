const host = 'localhost'
const port = 4000
const env  = process.env.ENV || 'development'
const ci   = env === 'ci'

module.exports = {
  ci,
  url: (
    ci
    ? 'http://clarity-develop.herokuapp.com'
    : `http://${host}:${port}`
  ),
}
