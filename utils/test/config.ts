const env = require('./environment') || 'ci'
const host = 'localhost'
const port = 4000
const ci = env === 'ci'

export default {
  env,
  ci,
  url: ci ? 'http://clarity-develop.herokuapp.com' : `http://${host}:${port}`,
}
