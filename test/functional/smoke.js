const { url } = require('./config')

module.exports = {
  beforeEach: browser => {
    browser
      .url(url)
      .waitForElementVisible('body', 100)
  },
  'Smoke test': browser => {
    browser
      .assert.visible('#root > div', 'Check if app has rendered with React')
      .assert.title('') // TODO: Add title
  },
  after: browser => browser.end(),
};
