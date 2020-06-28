const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var ObjectId = mongoose.ObjectId;

var membershipSchema = new Schema({
    provider: String,
    providerUserId: String,
    accessToken: String,
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

let GoogleUser = mongoose.model("GoogleUser", membershipSchema, 'users');
module.exports = GoogleUser;