const host = 'localhost'
const port = 4000
const url  = `http://${host}:${port}`

module.exports = {
  beforeEach: browser => {
    browser
      .url(url)
      .waitForElementVisible('body', 100)
  },
  'Counter increment': browser => {
    browser.expect.element('b#count').text.to.equal('0')
    browser
      .click('button#increment-btn')
      .expect.element('b#count').text.to.equal('1')
  },
  'Counter decrement': browser => {
    browser.expect.element('b#count').text.to.equal('0')
    browser
      .click('button#decrement-btn')
      .expect.element('b#count').text.to.equal('-1')
  },
  after: browser => browser.end(),
};
