const {isLoginProtected} = require('../../utils')

module.exports = {
  'The /posts/new page gives a 404 when not logged in': isLoginProtected(
    '/posts/new'
  ),

  after: browser => browser.end(),
}
