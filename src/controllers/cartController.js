const express = require("express");
const router = express();
const { ensureAuthenticated } = require("../config/auth");
const cartService = require("../services/cartService");

router.get("/cart", ensureAuthenticated, async (req, res) => {
  try {
    let { userId } = req.query;
    let items = await cartService.viewCart(userId);
    return res.json(items);
  } catch (err) {
    return res.json(err);
  }
});
router.post("/addtocart", ensureAuthenticated, async (req, res) => {
  try {
    let { productId, quantity, userId } = req.body;
    let result = await cartService.addToCart(userId, productId, quantity);
    return res.json(result);
  } catch (err) {
    return res.json(err);
  }
});

router.delete("/removefromcart", ensureAuthenticated, async (req, res) => {
  try {
    let { productId, userId } = req.body;
    let result = await cartService.addtocart(userId, productId);
    return res.json(result);
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
