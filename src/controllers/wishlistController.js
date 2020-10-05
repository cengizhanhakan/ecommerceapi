const express = require("express");
const router = express();
const { ensureAuthenticated } = require("../config/auth");
const WishlistService = require("../services/wishlistService");

router.get("/wishlist", ensureAuthenticated, async (req, res) => {
  try {
    let { userID } = req.query;
    let wishlistRecords = await WishlistService.viewWishlist(userID);
    return res.json(wishlistRecords);
  } catch (err) {
    return res.json(err);
  }
});

router.post("/addtowishlist", ensureAuthenticated, async (req, res) => {
  try {
    let { userID, productID } = req.body;
    let Item = await WishlistService.addToWishlist(userID, productID);
    return res.json(Item);
  } catch (err) {
    return res.json(err);
  }
});

router.delete("/removefromwishlist", ensureAuthenticated, async (req, res) => {
  try {
    let { userID, productID } = req.body;
    let wishlistRecords = await WishlistService.removeFromWishlist(
      userID,
      productID
    );
    return res.json(wishlistRecords);
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
