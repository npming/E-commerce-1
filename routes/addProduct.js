const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product');

router.get('/addProduct', (req, res) => {
    res.render('Pages/addProduct', {
        pageTitle: 'admin',
        Authenticated: req.session.isLoggedin
    })
})

router.post('/addProduct', async (req, res) => {
    //console.log(req);
    const response = await ProductModel.create({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        desc: req.body.desc,
        prodId: req.cart
    });
    res.redirect('/addProduct')
})

module.exports = router
