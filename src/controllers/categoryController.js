const express = require("express");
const router = express();
const categoryService = require("../services/categoryService");

router.get("/categories/:categoryName", async (req, res) => {
  try {
    let { categoryName } = req.params;
    let Items = await categoryService.findOne(categoryName);
    return res.json(Items);
  } catch (err) {
    return res.json(err);
  }
});

router.get("/categories", async (req, res) => {
  try {
    let Items = await categoryService.findAll();
    return res.json(Items);
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
