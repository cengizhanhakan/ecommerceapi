const express = require("express");
const router = express();
const categoryService = require("../services/categoryService");

router.get("/categories/:categoryName", async (req, res) => {
    try {
        let {
            categoryName
        } = req.params;
        let Items = await categoryService.findOne(categoryName);
        res.json(Items)
    } catch {
        res.json('error')
    }
});

router.get("/categories/", async (req, res) => {
    try {
        let Items = await categoryService.findAll();
        res.json(Items)
    } catch {
        res.json('error')
    }
});


module.exports = router;