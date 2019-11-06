const { User, Message } = require('../models');

const getAll = (req, res) => {
    const includeMessages = req.query.includeMessages == "true" ? true : false;
    const includeParams = includeMessages ? {model: Message,attributes: ['id', 'body', 'createdAt', 'UpdatedAt']} : null;
    User.findAll({
        attributes: ['id', 'email',],
        include: includeParams
    })
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

exports.userController = { getAll };