const {url}       = require('../config')
const {randomStr} = require('../utils')

const selectors = {
  lastPost:   'div[id="posts-list"] > div:last-child .post-list--post-title a',
  createBtn:  'button#post-form--create__create-button',
  iterateBtn: '#posts--show--iterate-btn',
  reviseBtn:  'button#post-form--revise__create-button',
  titleInput: 'input#post-form--revise__title',
}

module.exports = {
  // // TODO
  // 'Create a new post, then iterate': browser => {
  //   const title1   = randomStr()
  //   const title2   = 'New title'
  //   const content2 = 'New content'
  //   browser
  //     /** Create Post **/
  //     .url(`${url}/posts/new`)
  //     .setValue('input#post-form--create__title', title1)
  //     .waitForElementVisible(selectors.createBtn, 1000)
  //     .click(selectors.createBtn)
  //     .url(`${url}/posts`)
  //     .waitForElementVisible('.post-list--post-title', 1000)
  //     .assert.containsText(selectors.lastPost, title1)
  //     /** Create Iteration on Post **/
  //     .click(selectors.lastPost)
  //     .pause(100)
  //     .waitForElementVisible(selectors.iterateBtn, 1000)
  //     .click(selectors.iterateBtn)
  //     .keys(content2)
  //     .waitForElementVisible(selectors.titleInput, 1000)
  //     .clearValue(selectors.titleInput)
  //     .setValue(selectors.titleInput, title2)
  //     .assert.elementNotPresent('#iteration-0') // Hidden until more than one
  //     .assert.elementNotPresent('#iteration-1')
  //     .click(selectors.reviseBtn)
  //     /** Assert that a new iteration was added to the timeline **/
  //     .waitForElementVisible('#iteration-0', 1000)
  //     .assert.elementPresent('#iteration-0')
  //     .assert.elementPresent('#iteration-1')
  //     .click('#iteration-1')
  //     .assert.containsText('#iteration-title', title2)
  //     .assert.containsText('#iteration-body', content2)
  //     .click('#iteration-0')
  //     .assert.containsText('#iteration-title', title1)
  // },
  after: browser => browser.end(),
};
