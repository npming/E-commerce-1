const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product');

router.get('/category', async (req, res)=>{
    const data = await ProductModel.find();
    res.render('Pages/category', {
        pageTitle: 'Products',
        products: data,
        detailsPage: false,
        Authenticated: req.session.isLoggedin
    })
});

router.post('/category', async (req, res)=>{
    const data = await ProductModel.deleteOne({_id: req.body.id});
    res.redirect('/category')
});

router.get('/category/:id', async (req, res)=>{
    const data = await ProductModel.findOne({_id: req.params.id});
    res.render('Pages/category', {
        pageTitle: 'Products',
        products: [data],
        detailsPage: true,
        Authenticated: req.session.isLoggedin
    })
});

module.exports = router;