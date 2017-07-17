const {url, isLoginProtected} = require('../../utils')

module.exports = {
  'The /me page gives a 404 when not logged in': isLoginProtected('/me'),
  'The /posts/new page gives a 404 when not logged in': isLoginProtected(
    '/posts/new'
  ),

  after: browser => browser.end(),
}
