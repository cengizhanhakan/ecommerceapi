var mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate');

var UserSchema = mongoose.Schema({
  userid: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    unique: true

  },
  name: {
    type: String
  },

  activationStatus: {
    type: Number
  }

});
UserSchema.plugin(findOrCreate);
let User = mongoose.model('users', UserSchema, 'users');

module.exports = User;