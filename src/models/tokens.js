const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var tokenSchema = new Schema({
    createdat: Date,
    pwResetToken: String,
    activationToken: String,
    email: String,
});

let Token = mongoose.model("token", tokenSchema, 'tokens');
module.exports = Token;