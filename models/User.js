const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        email: { type: String, required: true },
        password: { type : String, required: true },
        admin: { type: Boolean, required: true },
        cart: { items: [] },
        //prodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
})

module.exports = mongoose.model('User', userSchema)