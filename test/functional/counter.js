const { url } = require('./config')

module.exports = {
  beforeEach: browser => {
    browser
      .url(`${url}/counter`)
      .waitForElementVisible('body', 100)
  },
  'Counter increment': browser => {
    browser.expect.element('#count').text.to.equal('0')
    browser
      .click('button#increment-btn')
      .expect.element('#count').text.to.equal('1')
  },
  'Counter decrement': browser => {
    browser.expect.element('#count').text.to.equal('0')
    browser
      .click('button#decrement-btn')
      .expect.element('#count').text.to.equal('-1')
  },
  after: browser => browser.end(),
};
