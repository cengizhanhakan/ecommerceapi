let mongoose = require("mongoose");

let WishSchema = new mongoose.Schema({
  userid: String,
  products: [String],
});
let Wishlist = mongoose.model("Wish", WishSchema, 'wishlist');

module.exports = Wishlist;