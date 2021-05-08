const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("homepage route");
    console.log(req.session.isLoggedin);
        res.render('landing', {
            products: 'abc',
            pageTitle: 'Bought',
            Authenticated: req.session.isLoggedin
        })
    }
)

module.exports = router;