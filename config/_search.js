/**
 * [infrastructure-configuration]
 */

const ELASTICSEARCH_DOMAIN = process.env.ELASTICSEARCH_DOMAIN
const SOLR_DOMAIN = process.env.SOLR_DOMAIN

module.exports = {
  vendor: {
    elasticsearch: {
      domain: ELASTICSEARCH_DOMAIN
    },
    solr: {
      domain: SOLR_DOMAIN
    }
  },
  specify: process.env.SEARCH_VENDOR
}
