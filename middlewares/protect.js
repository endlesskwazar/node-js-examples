exports.protect = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login');
    } else {
        req.userId = req.session.userId;
        next();
    }
}