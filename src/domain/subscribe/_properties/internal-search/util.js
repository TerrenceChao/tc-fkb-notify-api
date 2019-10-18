/**
 * [NOTE]
 * 關於第三方服務的反應時間無法掌握，所以除了 [web-push,internal-search] 以外,
 * 其他串接第三方服務的不須等待 callback
 */

var _ = require('lodash')
var help = require('../helper')
const SEARCH_DOMAIN = require('../constant').SEARCH_DOMAIN


/**
 * 
 * @param {Object} recipient 
 * @param {Object} content 
 */
function createDoc(recipient, content) {
  return Promise.resolve({
      method: `PUT`,
      url: `${SEARCH_DOMAIN}/person/_doc/${recipient.uid}`,
      headers: { 'content-type': 'application/json' },
      body: content,
      json: true
    })
    .then(options => help.requestHandler(`search: create doc`, options, 201))
    .catch(err => console.error(err))

}

/**
 * 
 * @param {Object} recipient 
 * @param {Object} content 
 */
function updateDoc(recipient, content) {
  return Promise.resolve({
      method: `POST`,
      url: `${SEARCH_DOMAIN}/person/_update/${recipient.uid}`,
      headers: { 'content-type': 'application/json' },
      body: { doc: _.omit(content, ['uid', 'profileLink']) },
      json: true
    })
    .then(options => help.requestHandler(`search: update doc`, options, 200))
    .catch(err => console.error(err))

}

function bulkUpdateDocList() {
  
}

module.exports = {
  createDoc,
  updateDoc,
  
  bulkUpdateDocList,
}