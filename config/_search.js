/**
 * [infrastructure-configuration]
 */

const ELASTICSEARCH_HOST = process.env.ELASTICSEARCH_HOST
const SOLR_HOST = process.env.SOLR_HOST

module.exports = {
  vendor: {
    elasticsearch: {
      host: ELASTICSEARCH_HOST
    },
    solr: {
      host: SOLR_HOST
    }
  },
  specify: process.env.SEARCH_VENDOR
}
