const {User} = require('../models');
const bcrypt = require('bcrypt');

const get = (req, res) => {
    res.render('register');
}

const post = (req, res) => {
    const {email, password} = req.body;
    const user = User.build({email, password});
    user.validate()
    .then(() => {
        return bcrypt.hash(user.password, 10);
    })
    .then(hash => {
        user.password = hash;
        return user.save();
    })
    .then(() => {
        console.log('user registered');
        req.session.userId = user.id
        res.redirect('/');
    })
    .catch(err => {
        res.render('register', {err});
    });
}

exports.registerController = {get, post}