const {url} = require('../config')
const {randomStr} = require('../utils')

module.exports = {
  // 'Check that list of posts contains title, username, & date': browser => {
  //   // TODO
  // },
  after: browser => browser.end(),
}
