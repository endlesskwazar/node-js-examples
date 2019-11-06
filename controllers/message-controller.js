const {Message} = require('../models');
const {User} = require('../models');

const getAll = (req, res) => {
    Message.findAll({
        attributes: ['id', 'body', 'createdAt', 'updatedAt'],
        include: {
            model: User,
            attributes: ['id', 'email']
        }
    })
    .then(messages => {
        res.json(messages);
    })
    .catch(err => {
        res.status(500).json(err);
    });
} 

const getOne = (req, res) => {
    const {id} = req.params;
    Message.findByPk(id, {
        attributes: ['id', 'body', 'createdAt', 'updatedAt'],
        include: {
            model: User,
            attributes: ['id', 'email']
        }
    })
    .then(message => {
        if (!message) {
            res.status(404).json({err: 'NotFound!!!'});
            return;
        }
        res.json(message);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

const post = (req, res) => {
    const {body} = req.body;
    const message = Message.build({body, userId: req.user.id});
    message.validate()
    .then(() => {
        return message.save()
    })
    .then(saved => {
        res.status(201).json(message);
    })
    .catch(err => {
        res.status(400).json(err);
    });
}

const remove = (req, res) => {
    const {id} = req.params;
    Message.findByPk(id)
    .then(message => {
        return message.destroy()
    })
    .then(() => {
        res.status(204).json();
    })
    .catch(err => {
        res.status(500).json(err);
    });
}

exports.messageController = {getAll, getOne, post, remove};