const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
        res.render('landing', {
            products: 'abc',
            pageTitle: 'Bought',
        })
    }
)

module.exports = router;