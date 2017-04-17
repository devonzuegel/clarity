const { url } = require('./config')

module.exports = {
  beforeEach: browser => {
    browser
      .url(url)
      .waitForElementVisible('body', 100)
  },
  'Submit a valid username': browser => {
    browser
      .clearValue('input#signup-form__username')
      .assert.title('') // TODO: Add title
      .setValue('input#signup-form__username', 'foobar')
      .click('button#signup-form__submit')
      .expect.element('#signup-form__errors').to.not.be.present
  },
  'Submit an invalid username': browser => {
    browser
      .clearValue('input#signup-form__username')
      .click('button#signup-form__submit')
      .waitForElementVisible('#signup-form__errors', 1000)
      .assert.visible('#signup-form__errors')
      .assert.containsText('#signup-form__errors', 'Your username cannot be empty.')
  },
  after: browser => browser.end(),
};
