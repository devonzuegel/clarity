const { getUrl } = require('./utils')

module.exports = {
  'Smoke test': browser => {
    browser
      .url(getUrl())
      .assert.visible('#root', 'Check if app has rendered with React')
      .assert.title('') // TODO: Add title
  },
  after: browser => browser.end(),
};
