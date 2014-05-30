
// # home

var mongoose = require('mongoose')
exports = module.exports = home

function home(lib, settings) {
  return {

	  render: function(req, res, next) {
	    res.render('home')
	  },

	  about: function(req, res, next) {
      	res.send(200, 'Hello, this is Igloo.')
	  }

	}
}

exports['@require'] = [ 'lib', 'settings' ];