const {getUrl} = require('./../utils')

module.exports = {
  'Check if app has rendered with React': browser => {
    browser
      .url(getUrl()) // Go to home page
      .assert.visible('#root')
      .assert.title('') // TODO: Add title
  },
  after: browser => browser.end(),
}
