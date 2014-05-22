
// # user

var mongoose = require('mongoose'),
    common = require('./common'),
    Schema = mongoose.Schema,
    mongooseTypes = require('mongoose-types')

mongooseTypes.loadTypes(mongoose)

var Email = mongoose.SchemaTypes.Email

var User = new Schema({
  email: {
    type: Email,
    required: true,
    unique: true
  },
  password: {
    type: String
  }
})

User.plugin(common)



// password salting

var bcrypt = require('bcrypt'),
    WORKFACTOR = 10


User.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(WORKFACTOR, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)
      user.password = hash
      next();
    });
  });
});


User.methods.comparePass = function(pass, cb) {
  bcrypt.compare(pass, this.password, function(err, match) {
    if (err) return cb(err)
    cb(null, match)
  });
};



module.exports = User;