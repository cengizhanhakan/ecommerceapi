const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var ObjectId = mongoose.ObjectId;

var securitySchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    activationToken: String,
    pwresetToken: String,
});

let Security = mongoose.model("security", securitySchema, 'secschema');
module.exports = Security;