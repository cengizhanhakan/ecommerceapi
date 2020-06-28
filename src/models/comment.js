var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  commentTitle: {
    type: String,
  },
  comment: {
    type: String,
  },
  date: {
    type: Date,
  },
  productId: {
    type: String,
  },
  userId: {
    type: String,
  }
});

let Comment = mongoose.model("comments", commentSchema, 'reviews');

module.exports = Comment;