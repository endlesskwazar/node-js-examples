const {User} = require('../models');

const get = async (req, res) => {
    const user = await User.findByPk(req.userId);
    res.render('home', {user});
}

exports.homeController = {get};