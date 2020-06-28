const express = require('express');
const router = express();
const Cart = require('../models/cart.js');
const Products = require('../models/products.js');

exports.viewCart = async (userId) => {
  let User = await Cart.findOne({
    userid: userId
  })
  let Result = [];
  let quantity = [];
  for (let product of User.products) {
    let Product = await Products.findOne({
      id: product.productid
    });
    Product ? Result.push(Product) : {}
  }

  for (let product of User.products) {
    let Product = product.quantity
    quantity.push(Product)
  }
  return [Result, quantity]
};

exports.addToCart = async (userId, productId, quantity) => {
  let User = await Cart.findOne({
    userid: userId
  });
  if (User.products.productid.indexOf(productId) == typeof (String)) {
    User.products[User.products.productid.indexOf(productId)].quantity += quantity;
    return await User.save();
  }
  User.products.push({
    productid: productId,
    quantity
  })
  return await User.save();

};

exports.removeFromCart = async (userId, productId) => {
  let User = await Cart.findOne({
    userId
  });
  if (User.products.indexOf(productId) != null || User.products.indexOf(productId) != undefined) {
    User.products.splice(User.products.indexOf(productId), 1)
    return await User.save();
  }
};