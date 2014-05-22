/**
 * API Index
 * This module should contain details about
 * all API routes.
 */


module.exports = function(server) {

  // version 1.0.0

  require('./v1/public')(server)
  require('./v1/private')(server)
  
}
