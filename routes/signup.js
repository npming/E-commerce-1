const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/User');
const bcrypt = require('bcryptjs');
//const sgMail = require('@sendgrid/mail')

// const SENDGRID_API_KEY = '';
// sgMail.setApiKey(SENDGRID_API_KEY);

router.get('/signup', (req, res) => {
    res.render('Pages/signup', {
        pageTitle: 'sign up',
    })
})

router.post('/signup', async (req, res) => {
    const email = req.body.email;
    const data = await userModel.find({
        email: email,
    });
    //check if user already exist
    if(data && data.length){
        res.redirect('/login');
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
        res.redirect('/login')
        // sending email on successful signup
        // sgMail.send({
        //     to: email, 
        //     from: 'npming.dev@gmail.com',
        //     subject: 'sign up successful',
        //     text: 'and easy to do anywhere, even with Node.js',
        //     html: `<h1>You have successfully signed up with</h1>`
        // }).then((response) => {
        //     console.log(response[0].statusCode)
        //     console.log(response[0].headers)
        //   })
        //   .catch((error) => {
        //     console.error(error)
        //   })
    }
})


module.exports = router;