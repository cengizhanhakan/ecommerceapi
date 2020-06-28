const express = require('express');
const router = express();
const passport = require('passport');
const Comment = require("../models/comment.js");

exports.sendcomment = async (comment, commentTitle, userId, productId) => {
  let Item = Comment.create({
    commentTitle,
    comment,
    date: new Date(),
    productId,
    userId
  })
  return await Item
};


exports.viewComments = async (productId) => {
  let Item = Comment.find({
    productId
  })
  if (!Item) {
    return 'No comments found.';
  }
  return await Item
};