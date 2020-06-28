const Wishlist = require('../models/wishlist.js');
const Products = require('../models/products.js');



exports.viewWishlist = async (userId) => {
  let User = await Wishlist.findOne({
    userId
  })
  let Result = [];
  for (let productId of User.products) {
    let Product = await Products.findOne({
      id: productId
    });
    Product ? Result.push(Product) : {}
  }
  return Result
}

exports.addToWishlist = async (userId, productId) => {
  let User = await Wishlist.findOne({
    userId
  });
  if (User.products.indexOf(productId) == typeof (String)) {
    User.products.push(productId)
    return await User.save();
  }
  return 'Item already exists on your wishlist'
}

exports.removeFromWishlist = async (userId, productId) => {
  let User = await Wishlist.findOne({
    userId
  });
  if (User.products.indexOf(productId) != null || User.products.indexOf(productId) != undefined) {
    User.products.splice(User.products.indexOf(productId), 1)
    return await User.save();
  }
}