const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/signup', (req, res) => {
    res.render('Pages/signup', {
        pageTitle: 'sign up',
        Authenticated: false
    })
})

router.post('/signup', async (req, res) => {
    const email = req.body.email;
    const data = await userModel.find({
        email: email,
    });
    //check if user already exist
    if(data && data.length){
        res.redirect('/login')
    }
    else {  // register new user
        bcrypt.hash(req.body.password, 6).then(hashedPw => {
            return userModel.create({
                email: req.body.email,
                password: hashedPw,
                admin: req.body.admin ? true : false,
                cart: { items: [] }
            })
        }).catch(err => console.log(err))
        res.redirect('/')
    }
})


module.exports = router;