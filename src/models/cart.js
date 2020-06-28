let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let cartProductsSchema = new Schema({
	productid: String,
	quantity: Number,
})


let cartSchema = new Schema({
	userid: String,
	products: [cartProductsSchema],
})

let Cart = mongoose.model('cart', cartSchema, 'cart');

module.exports = Cart;