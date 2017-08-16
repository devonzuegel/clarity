const {url, nav} = require('../config')
const randomStr = () => Math.random().toString(36).substr(2, 5)

const getUrl = path => `${url}${path || ''}`

const isLoginProtected = path => browser => {
  browser
    .url(getUrl(path))
    .waitForElementVisible('#not-found', 5000)
    .assert.containsText('body', '404')
}

const logIn = (browser, username = randomStr()) =>
  browser
    // App must be running in a test environment to bypass Facebook auth
    .url(`${url}/auth/facebook`)
    // Set username
    .waitForElementVisible('input#set-username__username', 5000)
    .setValue('input#set-username__username', username)
    .click('button#set-username__button')
    .waitForElementVisible('#root', 1000)

module.exports = {
  randomStr,
  logIn,
  getUrl,
  isLoginProtected,
}
