const {getUrl} = require('./utils')

module.exports = {
  'Check if app has rendered with React': browser => {
    browser
      .url(getUrl()) // Go to home page
      .assert.visible('#root')
      .assert.title('') // TODO: Add title
  },
  'Check that /posts page has content': browser => {
    browser
      .url(getUrl('/posts')) // Visible even when not logged in
      .assert.containsText('#root', 'All posts')
  },
  after: browser => browser.end(),
}
