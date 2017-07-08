const {url} = require('./config')

const randomStr = () => Math.random().toString(36).substr(2, 5)

const getUrl = path => `${url}${path || ''}`

const isLoginProtected = path => browser => {
  browser.url(getUrl(path)).assert.containsText('body', '404')
}

module.exports = {
  randomStr,
  getUrl,
  isLoginProtected,
}
