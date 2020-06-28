const express = require("express");
const router = express();
const productService = require("../services/productService");
const commentService = require("../services/commentService");
const {ensureAuthenticated} = require('../config/auth');


router.get("/categories/:category/:products", async (req, res) => {
    try {
        let {
            products
        } = req.params;
        let Items = await productService.findAll(products)
        res.json(Items);
    } catch {
        res.json('error');
    }
});

router.get("/categories/:category/:products/:productsbrand", async (req, res) => {
    try {
        let {
            productsbrand
        } = req.params;
        let Items = await productService.findOne(productsbrand)
        res.json(Items);
    } catch {
        res.json('error');
    }
});

router.get("/search", async (req, res) => {
    try {
        let {
            name
        } = req.query.name;
        let Results = await productService.search(name);
        res.json(Results);
    } catch {
        res.json('error')
    }
});


router.post("/sendcomment", ensureAuthenticated, async (req, res) => {
    let {
        comment,
        commentTitle,
        userId,
        productId
    } = req.body;
    try {
        let Items = await commentService.sendcomment(comment, commentTitle, userId, productId)
        res.json(Items)
    } catch (err) {
        res.json(err)
    }
});


module.exports = router;