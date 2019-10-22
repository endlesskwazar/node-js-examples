const {User} = require('../models');
const bcrypt = require('bcrypt');

const get = (req, res) => {
    res.render('login');
}

const post = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.render('login', {message: 'Credentioals not provided'});
        return;
    }
    const user = await User.findOne({where: {email}});
    if (!user) {
        res.render('login', {message: 'No such user.'});
        return;
    }
    bcrypt.compare(password, user.password)
    .then(compareRes => {
        if (!compareRes) {
            res.render('login', {message: 'Password wrong.'});
            return;
        }
        else {
            console.log('login ok redirecting');
            req.session.userId = user.id;
            res.redirect('/');
            return;
        }
    });

}

exports.loginController = {get, post};