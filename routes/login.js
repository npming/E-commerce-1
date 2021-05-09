const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    res.render('Pages/login', {
        pageTitle: 'Login'
    })
})

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password
    const data = await userModel.findOne({
        email: email,
    });
    if(data && data.email == email){
        bcrypt.compare(password, data.password).then(doMatch => {
            if(doMatch) {
                req.session.isLoggedin = true;
                req.session.user = data;
                req.session.save(err =>{
                    console.log(err);
                    res.redirect('/')
                })
                
            } else {
                res.redirect('/login')
                //res.json({message: "invalid email or password"})
            }
        })
    }
    else {
        res.redirect('/signup')
        //res.json({message: "invalid email or password"})
    }
    
})

module.exports = router;