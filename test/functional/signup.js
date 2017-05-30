const {url}       = require('./config')
const {randomStr} = require('./utils')


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
      .clearValue('input#signin-form__username')
      .setValue('input#signin-form__username', username)
      .click('button#signin-form__signup-button')
      .expect.element('#signin-form__errors').to.not.be.present
  },
  'Submit an empty (invalid) username': browser => {
    browser
      .clearValue('input#signin-form__username')
      .click('button#signin-form__signup-button')
      .waitForElementVisible('#signin-form__errors', 1000)
      .assert.visible('#signin-form__errors')
      .assert.containsText('#signin-form__errors', 'Your username cannot be empty.')
  },
  'Submit a username that is already taken': browser => {
    const username = randomStr()
    browser
      .clearValue('input#signin-form__username')
      .setValue('input#signin-form__username', username)
      .click('button#signin-form__signup-button')
      .waitForElementVisible('a#nav--log-out', 1000)
      .click('a#nav--log-out')
      .waitForElementVisible('input#signin-form__username', 1000)
      .clearValue('input#signin-form__username')
      .setValue('input#signin-form__username', username)
      .click('button#signin-form__signup-button')
      .waitForElementVisible('#signin-form__errors', 1000)
      .assert.containsText('#signin-form__errors', `The username "${username}" is not available`)
  },
  'Sign up then sign in changes the user in the nav': browser => {
    const username = randomStr()
    browser
      .click('a#nav--log-in')
      .click('input#signin-form__username')
      .setValue('input#signin-form__username', username)
      .click('button#signin-form__signup-button')
      .waitForElementVisible('a#nav--user', 1000)
      .assert.containsText('a#nav--user', username)
      .click('a#nav--log-out')
      .waitForElementVisible('a#nav--log-in', 1000)
      .expect.element('a#nav--user').to.not.be.present
  },
  after: browser => browser.end(),
};
