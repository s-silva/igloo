
// # Igloo

var async = require('async')
var config = require('./config')
var schemas = require('./schemas')
var lib = require('./lib')(config)
var app = require('./config/app')

module.exports = igloo

function igloo(callback) {

  async.parallel({
    db: lib.mongo,
    sessions: lib.redis
  }, loadConnections)

  function loadConnections(err, connections) {
    if (err) return callback(err)
    lib.db = connections.db
    lib.config.session.store = lib.sessions = connections.sessions
    schemas(lib, loadSchemas)
  }

  function loadSchemas(err, lib) {
    if (err) return callback(err)
    app(lib, callback)
  }

}

if (!module.parent){
  
  igloo(function(err, app) {
    if (err) return lib.logger.error(err)

    require('./api/server')(config, lib.db)

    app.listen(config.port, function() {
      lib.logger.info('Igloo started at %s://%s:%d', config.protocol, config.host, config.port)
    })
  })
}