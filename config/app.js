
// # app

var express = require('express')
var flash = require('connect-flash')
var dynamicHelpers = require('./dynamic-helpers')
var development = require('./development')
var production = require('./production')
var auth = require('./auth')
var settings = require('./settings')
var routes = require('./routes')
var ioc = require('electrolyte')
var session = require('express-session')
var methodOverride = require('method-override')
var errorHandler = require('errorhandler')
var serveFavicon = require('serve-favicon')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var dataNode = require('../lib/dataNode')


module.exports = function(lib, callback) {

  var app = express()

  // set the environment
  app.set('env', lib.config.env)

  // disable x-powered-by
  app.disable('x-powered-by')

  // trust proxy
  app.enable('trust proxy')

  // set-up electrolyte
  ioc.loader('controllers', ioc.node('app/controllers'));
  ioc.loader('models', ioc.node('app/models'));
  ioc.loader(ioc.node('config'));

  // set-up data nodes (inject data)
  ioc.loader(dataNode(lib, 'lib'));
  ioc.loader(dataNode(app, 'app'));

  // set the default views directory
  app.set('views', lib.config.viewsDir)

  // make jade the default view engine
  app.set('view engine', 'jade')

  // make jade pretty
  app.locals.pretty = true

  // ignore GET /favicon.ico
  app.use(serveFavicon(lib.config.favicon))

  // development only config
  switch(lib.config.env){
  case 'development':
    development(lib, app);
    break;

  case 'production':
    production(lib, app)
    break;
  }

  // pass a secret to cookieParser() for signed cookies
  app.use(cookieParser(lib.config.cookieParser))

  // parse request bodies
  app.use(bodyParser())

  // support _method (PUT in forms etc)
  app.use(methodOverride())

  // add req.session cookie support
  app.use(session(lib.config.session))
  
  // add flash message support
  app.use(flash())

  // add dynamic helpers for views
  app.use(dynamicHelpers)

  // add support for authentication
  auth(lib, app)()

  // load the routes
  routes(lib, app)()

  // static server
  app.use(express.static(lib.config.publicDir, lib.config.staticServer))

  // error handling
  app.use(errorHandler())

  //-- igloo.patch.marker: middleware-last --//

  callback(null, app)

  return {app: app, lib: lib}
}

