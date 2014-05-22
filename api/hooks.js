/**
 * This module controls authentication (OAuth2)
 * Based on cc samples in restify-oauth2 
 */

var _ = require("underscore");
var crypto = require("crypto");


function generateToken(data) {
  var random = Math.floor(Math.random() * 100001);
  var timestamp = (new Date()).getTime();
  var sha256 = crypto.createHmac("sha256", random + "WOO" + timestamp);

  return sha256.update(data).digest("base64");
}


module.exports = function(config, db){
  var models = require('../app/models')

  return {
    grantClientToken: function (credentials, req, cb) {

      var User = db.model('User', models.User)
      var AccessToken = db.model('AccessToken', models.AccessToken)

      User.findOne({email: credentials.clientId}, function( err, user ) {

        if(err) return cb(null, false)

        user.comparePass(credentials.clientSecret, function(err, match) {
          
          if(err) return cb(null, false)
          if(!match) return cb(null, false)

          console.log('API: Correct credentials!')

          var token = generateToken(credentials.clientId + ":" + credentials.clientSecret)

          AccessToken.create({token: token, email: user.email, userId: user._id}, function(err, accessToken){
            if(err) return cb(err, false)

            console.log('API: Created token')
            return cb(null, token)
          })

          
        })

      })

    },

    authenticateToken: function (token, req, cb) {
      var AccessToken = db.model('AccessToken', models.AccessToken)
      var User = db.model('User', models.User)

      AccessToken.findOne({token: token}, function( err, retToken ) {
        if(err || !retToken) cb(null, false)
        if(!retToken.email) cb(null, false)

        User.findOne({email: retToken.email}, function( err, user ) {

          req.authUser = user
          req.clientId = retToken.email
          return cb(null, true)
        })

      })
    }
  }
}