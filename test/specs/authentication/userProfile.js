const {nav} = require('../../config')
const {logIn, randomStr} = require('../../utils')

module.exports = {
  'The user navigates to her profile from the logged-in nav bar': browser => {
    const username = randomStr()
    logIn(browser, username)
      .waitForElementVisible(nav.userProfile, 1000)
      .click(nav.userProfile)
      .url(function(result) {
        this.assert.ok(result.value.endsWith(`/@${username}`))
      })
      .assert.containsText('main', 'No posts to display')
  },

  after: browser => browser.end(),
}
