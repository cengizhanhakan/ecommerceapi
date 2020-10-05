const express = require("express");
const router = express();
const productService = require("../services/productService");
const commentService = require("../services/commentService");
const { ensureAuthenticated } = require("../config/auth");

router.get("/categories/:category/:products", async (req, res) => {
  try {
    let { products } = req.params;
    let Items = await productService.findAll(products);
    return res.json(Items);
  } catch (err) {
    return res.json(err);
  }
});

router.get(
  "/categories/:category/:products/:productsbrand",
  async (req, res) => {
    try {
      let { productsbrand } = req.params;
      let Items = await productService.findOne(productsbrand);
      return res.json(Items);
    } catch (err) {
      return res.json(err);
    }
  }
);

router.get("/search", async (req, res) => {
  try {
    let { name } = req.query.name;
    let Results = await productService.search(name);
    return res.json(Results);
  } catch (err) {
    return res.json(err);
  }
});

router.post("/sendcomment", ensureAuthenticated, async (req, res) => {
  let { comment, commentTitle, userId, productId } = req.body;
  try {
    let Items = await commentService.sendcomment(
      comment,
      commentTitle,
      userId,
      productId
    );
    return res.json(Items);
  } catch (err) {
   return res.json(err);
  }
});

module.exports = router;
