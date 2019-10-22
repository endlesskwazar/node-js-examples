exports.protect = (req, res, next) => {
    if (!req.session.userId) {
        console.log('no user. redirect');
        res.redirect('/login');
    } else {
        console.log('user logged in');
        req.userId = req.session.userId;
        next();
    }
}