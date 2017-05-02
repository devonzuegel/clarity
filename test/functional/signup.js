const { url       } = require('./config')
const { randomStr } = require('./utils')

module.exports = {
  beforeEach: browser => {
    browser
      .url(`${url}/signin`)
      .waitForElementVisible('body', 100)
  },
  'The signin page should have the expected title': browser => {
    browser.assert.title('') // TODO: Add title
  },
  'Submit a valid username': browser => {
    const username = randomStr()
    browser
      .clearValue('input#signup-form__username')
      .setValue('input#signup-form__username', username)
      .click('button#signup-form__submit')
      .expect.element('#signup-form__errors').to.not.be.present
  },
  'Submit an empty (invalid) username': browser => {
    browser
      .clearValue('input#signup-form__username')
      .click('button#signup-form__submit')
      .waitForElementVisible('#signup-form__errors', 1000)
      .assert.visible('#signup-form__errors')
      .assert.containsText('#signup-form__errors', 'Your username cannot be empty.')
  },
  'Submit a username that is already taken': browser => {
    const username = randomStr()
    browser
      .clearValue('input#signup-form__username')
      .setValue('input#signup-form__username', username)
      .click('button#signup-form__submit')
      .waitForElementVisible('a#nav--log-out', 1000)
      .click('a#nav--log-out')
      .waitForElementVisible('input#signup-form__username', 1000)
      .clearValue('input#signup-form__username')
      .setValue('input#signup-form__username', username)
      .click('button#signup-form__submit')
      .waitForElementVisible('#signup-form__errors', 1000)
      .assert.containsText('#signup-form__errors', `The username "${username}" is not available`)
  },
  'Sign up then sign in changes the user in the nav': browser => {
    const username = randomStr()
    browser
      .click('a#nav--calculator')
      .click('a#nav--log-in')
      .click('input#signup-form__username')
      .setValue('input#signup-form__username', username)
      .click('button#signup-form__submit')
      .waitForElementVisible('a#nav--user', 1000)
      .assert.containsText('a#nav--user', username)
      .click('a#nav--log-out')
      .waitForElementVisible('a#nav--log-in', 1000)
      .expect.element('a#nav--user').to.not.be.present
  },
  after: browser => browser.end(),
};
