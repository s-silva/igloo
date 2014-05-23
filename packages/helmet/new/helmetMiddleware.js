module.exports = function(app, config){
  var helmet = require('helmet')

  app.use(helmet.csp())
  app.use(helmet.xframe('deny'))
  app.use(helmet.contentTypeOptions())

  app.use(helmet.defaults())
}