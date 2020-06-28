const express = require('express');
const router = express();
const {
  ensureAuthenticated
} = require('../config/auth');
const WishlistService = require('../services/wishlistService');

router.get('/wishlist', ensureAuthenticated, async (req, res) => {
  try {
  let {
    userID
  } = req.query
  let Items = await WishlistService.viewWishlist(userID);
  res.json(Items)
} catch {
  res.json('error')
}
});


router.post('/addtowishlist', ensureAuthenticated, async (req, res) => {
  let {
    userID,
    productID
  } = req.body
  let Items = await WishlistService.addToWishlist(userID, productID);
  res.json(Items)
});

router.delete('/removefromwishlist', ensureAuthenticated, async (req, res) => {
  let {
    userID,
    productID
  } = req.body
  let Items = await WishlistService.removeFromWishlist(userID, productID);
  res.json(Items)
});

module.exports = router;