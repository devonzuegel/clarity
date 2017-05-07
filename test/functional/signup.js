const { url       } = require('./config')
const { randomStr } = require('./utils')

module.exports = {
  beforeEach: browser => {
    browser
      .url(`${url}/signin`)
      .waitForElementVisible('body', 100)
  },
  after: browser => browser.end(),
};
