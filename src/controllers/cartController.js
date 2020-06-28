const express = require('express');
const router = express();
const {
  ensureAuthenticated
} = require('../config/auth');
const cartService = require('../services/cartService');


router.get('/cart', ensureAuthenticated, async (req, res) => {
  try {
    let {
      userId
    } = req.query;
    let items = await cartService.viewCart(userId);
    res.json(items)
  } catch (err) {
    res.json(err)
  }
})
router.post('/addtocart', ensureAuthenticated, async (req, res) => {
  try {
    let {
      productId,
      quantity,
      userId
    } = req.body;
    let result = await cartService.addToCart(userId, productId, quantity);
    res.json(result)
  } catch {
    res.json("anan")
  }
});

router.delete('/removefromcart', ensureAuthenticated, async (req, res) => {
  let {
    productId,
    userId
  } = req.body;
  let result = await cartService.addtocart(userId, productId);
  res.json(result)
});

module.exports = router;