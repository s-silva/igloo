module.exports = function(app, config){
  var path = require('path')

  var sslEnabled = false

  // Set the CDN options
  var options = {
      publicDir  : path.join(__dirname, '../../assets/public')
    , viewsDir   : path.join(__dirname, '../../app/views')
    , domain     : 'cdn.your-domain.com'
    , bucket     : 'bucket-name'
    , endpoint   : 'bucket-name.s3.amazonaws.com' // optional
    , key        : 'amazon-s3-key'
    , secret     : 'amazon-s3-secret'
    , hostname   : 'localhost'
    , port       : (sslEnabled ? 443 : 1337)
    , ssl        : sslEnabled
    , production : true
  };

  // Initialize the CDN magic
  var CDN = require('express-cdn')(app, options)

  app.enable('view cache')
  app.locals.CDN = CDN()
}