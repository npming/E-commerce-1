const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session)
const { MONGO_URI } = require('./db/database');

const app = express();
//creating a session storage in database
const store = new MongoDbStore({
    uri: MONGO_URI,
    collection: 'sessions'
})
// session middleware
app.use(session({ 
    secret: 'mysecret', 
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 3600000
    }
}))

// importing routes
const home = require('./routes/landing');
const addProduct = require('./routes/addProduct');
const categoryPage = require('./routes/category');
const cart = require('./routes/cart');
const login = require('./routes/login');
const signup = require('./routes/signup');
const logout = require('./routes/logout');

//middlewares start
app.use(express.urlencoded({extended: false}))
//serving static files like css
app.use(express.static(path.join(__dirname, 'public')))
//middlewares end

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(home);
app.use(login);
app.use(signup);
app.use(categoryPage);
//logout on session expire
app.use((req, res, next)=> {
    if(!req.session.isLoggedin){
        return res.redirect('/login')
    }
    next();
});
app.use(addProduct);
app.use(cart);
app.use(logout);
// 404
app.use((req, res) => {
    res.send("Page Not Found")
})

//connecting database
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology:true}).then(result => {
    app.listen(3000);
}).catch(err => console.log("connection failed", err))