
// # token

var mongoose = require('mongoose'),
    common = require('./common'),
    Schema = mongoose.Schema,
    mongooseTypes = require('mongoose-types')

mongooseTypes.loadTypes(mongoose)

var Email = mongoose.SchemaTypes.Email

var AccessToken = new Schema({
  email: {
    type: Email
  },
  token: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId
  },
  createdAt: {
    type: Date,
    expires: 7884000, // 3 months in seconds
    default: Date.now 
  }
})

module.exports = AccessToken;