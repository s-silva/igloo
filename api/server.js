
var async = require('async')
var restify = require("restify")
var restifyOAuth2 = require("restify-oauth2")
var schemas = require('../schemas')

var server = restify.createServer({
  name: "Igloo API Server",
  version: require("../package.json").version,
  formatters: {
    "application/hal+json": function (req, res, body) {
      return res.formatters["application/json"](req, res, body)
    }
  }
})


// server routing 'middleware' to setup version strings
// and security values in batches.

var midServer = {

  version: null,
  security: null,

  get: function(path, callback){
    var cb = callback
    var secureCallback = function(req, res){
      if (req.clientId)
        return callback(req, res)
      else
        return res.sendUnauthenticated()
    }

    if(this.security === 'private') cb = secureCallback;

    if(this.version)
      return server.get({path: path, version: this.version}, cb)
    else
      return server.get(path, cb)
  },
  post: function(path, callback){
    var cb = callback
    var secureCallback = function(req, res){
      if (req.clientId)
        return callback(req, res)
      else
        return res.sendUnauthenticated()
    }

    if(this.security === 'private') cb = secureCallback;

    if(this.version)
      return server.post({path: path, version: this.version}, cb)
    else
      return server.post(path, cb)
  },
  put: function(path, callback){
    var cb = callback
    var secureCallback = function(req, res){
      if (req.clientId)
        return callback(req, res)
      else
        return res.sendUnauthenticated()
    }

    if(this.security === 'private') cb = secureCallback;

    if(this.version)
      return server.put({path: path, version: this.version}, cb)
    else
      return server.put(path, cb)
  },
  del: function(path, callback){
    var cb = callback
    var secureCallback = function(req, res){
      if (req.clientId)
        return callback(req, res)
      else
        return res.sendUnauthenticated()
    }

    if(this.security === 'private') cb = secureCallback;

    if(this.version)
      return server.del({path: path, version: this.version}, cb)
    else
      return server.del(path, cb)
  }

}

// create sample admin@example.com user with password: admin
// not enabled by default, check the uncommented line in initModule()

var createSampleUser = function(config, db){
  var models = require('../app/models')
  var User = db.model('User', models.User)

  User.create({email: 'admin@example.com', password: 'admin'}, function( err, user ) {
    if(err)
      console.log('API: Something went wrong.')
    else
      console.log('API: Created user.')
  });

}



// initialize modules and the server

var initModule = module.exports = function(config, db){

 
  server.use(restify.authorizationParser())
  server.use(restify.bodyParser({mapParams: false}))

  server.pre(restify.pre.pause());
  server.pre(restify.pre.sanitizePath());
  server.pre(restify.pre.userAgentConnection());
  server.use(restify.requestLogger());
  server.use(restify.throttle({
          burst: 10,
          rate: 10,  // 10 requests/sec.
          ip: true,
  }));

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.dateParser());
  server.use(restify.queryParser());
  server.use(restify.gzipResponse());


  restifyOAuth2.cc(server, {tokenEndpoint: '/token', hooks: require("./hooks")(config, db)})

  require('./modules')(midServer)

  // createSampleUser(config, db);

  // set API instructions for initial API
  // route

  server.get('/', function (req, res) {
    var response = {_links: {}}

    response._links["oauth2-token"] = {
        href: '/token',
        "grant-types": "client_credentials",
        "token-types": "bearer"
    };

    res.contentType = "application/hal+json"
    res.send(response)
  });

  server.listen(config.api.server.port, config.api.server.host, function () {
    console.log('%s listening at %s', server.name, server.url)
  })
}


// there might be cases where one wants to
// just run API server. probably in a different
// server?

if(!module.parent) {

  var config = require('../config')
  var lib = require('../lib')(config)

  async.parallel({
    db: lib.mongo
  }, loadConnections)

  function loadConnections(err, connections) {
    if (err) return callback(err)
    lib.db = connections.db
    schemas(lib, loadSchemas)
  }

  function loadSchemas(err, lib) {
    if (err) 
      console.log('API: Error in API server DB connections')

    initModule(config, lib.db)
  }

  
}

