
// # routes

var IoC = require('electrolyte')
var lib, app


module.exports = function(_lib, _app) {
  lib = _lib
  app = _app
  return routes
}

function routes() {

  var home = IoC.create('controllers/home')

  app.get('/', home.render)
  app.get('/about', home.about)


  //-- igloo.patch.marker: routes-last --//
  
}

