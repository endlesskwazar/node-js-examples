const {User} = require('../models');

const getAll = (req, res) => {
    User.findAll({attributes: ['id', 'email']})
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal Server Error'});
    });
}

exports.userController = {getAll};