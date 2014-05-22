
var restify = require("restify")
var restifyOAuth2 = require("restify-oauth2")
var hooks = require("./hooks")

var server = restify.createServer({
  name: "Igloo API Server",
  version: require("../package.json").version,
  formatters: {
    "application/hal+json": function (req, res, body) {
      return res.formatters["application/json"](req, res, body)
    }
  }
})

server.use(restify.authorizationParser())
server.use(restify.bodyParser({mapParams: false}))
restifyOAuth2.cc(server, {tokenEndpoint: '/token', hooks: hooks})

// set API instructions for initial API
// route

server.get('/', function (req, res) {
  var response = {}

  response._links["oauth2-token"] = {
      href: '/token',
      "grant-types": "client_credentials",
      "token-types": "bearer"
  };

  res.contentType = "application/hal+json"
  res.send(response)
});


// server routing 'middleware' to setup version strings
// and security values in batches.

var midServer = {

  version: null,
  security: null,

  get: function(path, callback){
    var cb = callback
    var secureCallback = function(req, res, next){
      if (req.clientId)
        callback(req, res, next)
      else
        return res.sendUnauthenticated()
    }

    if(this.security === 'private') cb = secureCallback;

    if(this.version)
      return server.get({path: path, version: this.version}, cb)
    else
      return server.get(path, callback)
  },
  post: function(path, callback){
    var cb = callback
    var secureCallback = function(req, res, next){
      if (req.clientId)
        callback(req, res, next)
      else
        return res.sendUnauthenticated()
    }

    if(this.security === 'private') cb = secureCallback;

    if(this.version)
      return server.post({path: path, version: this.version}, cb)
    else
      return server.post(path, callback)
  },
  put: function(path, callback){
    var cb = callback
    var secureCallback = function(req, res, next){
      if (req.clientId)
        callback(req, res, next)
      else
        return res.sendUnauthenticated()
    }

    if(this.security === 'private') cb = secureCallback;

    if(this.version)
      return server.put({path: path, version: this.version}, cb)
    else
      return server.put(path, callback)
  },
  del: function(path, callback){
    var cb = callback
    var secureCallback = function(req, res, next){
      if (req.clientId)
        callback(req, res, next)
      else
        return res.sendUnauthenticated()
    }

    if(this.security === 'private') cb = secureCallback;

    if(this.version)
      return server.del({path: path, version: this.version}, cb)
    else
      return server.del(path, callback)
  }

}

// initialize modules and the server

require('./modules')(midServer)

var initModule = module.exports = function(config){
  server.listen(config.api.server.port, config.api.server.host, function () {
    console.log('%s listening at %s', server.name, server.url)
  })
}

// there might be cases where one wants to
// just run API server. probably in a different
// server?

if(!module.parent) {
  initModule(require('../config'))
}
