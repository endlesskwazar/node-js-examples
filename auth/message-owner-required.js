const {Message} = require('../models');

const messageOwnerRequired = async (req, res, next) => {
    const {id} = req.params;
    const message = await Message.findByPk(id);
    if (!message) {
        res.status(404).json({err: 'NotFound!!!'});
        return;
    }
    if(message.userId != id) {
        res.status(403).json({err: 'You cannot delete this message'});
        return;
    }
    next()
}

exports.messageOwnerRequired = messageOwnerRequired;