const {url, nav} = require('../config')
const randomStr = () => Math.random().toString(36).substr(2, 5)

const getUrl = path => `${url}${path || ''}`

const isLoginProtected = path => browser => {
  browser
    .url(getUrl(path))
    .waitForElementVisible('#not-found', 1000)
    .assert.containsText('body', '404')
}

const logIn = browser =>
  browser
    .url(`${url}/posts`)
    // App must be running in a test environment to bypass Facebook auth
    .click(nav.logIn)
    // Set username
    .setValue('input#set-username__username', randomStr())
    .click('button#set-username__button')
    .waitForElementVisible('#root', 1000)

module.exports = {
  randomStr,
  logIn,
  getUrl,
  isLoginProtected,
}
