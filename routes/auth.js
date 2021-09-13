const router = require("express").Router()
const User = require("../models/User.model");
const bcrypt = require('bcryptjs');


function requireLogin(req, res, next) {
    if(req.session.currentUser) {
        next();
    }else {
        res.redirect("/login");
    }
}

router.get("/signup", (req, res) => {
    res.render('auth/signup')
});

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/signup', async(req, res) => {
    const {username, password} = req.body;
    if (username === "" || password === "") {
        res.render('auth/signup', {errorMessage: 'Fill username and password'})
        return;
    }

    const user = await User.findOne({username});
    if (user !== null) {
        res.render('auth/signup', {errorMessage: 'User already exists'});
        return
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    await User.create({
        username,
        password: hashedPassword,
    });
    res.redirect('/')

})

module.exports = router;
