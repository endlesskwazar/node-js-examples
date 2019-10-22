exports.logoutController = (req, res) => {
    if(req.session.userId){
        req.session.userId = null;
    }
    res.redirect('/');
}