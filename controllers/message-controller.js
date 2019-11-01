const {Message} = require('../models');

//Get all messages (get api/messages)
const getAll = (req, res) => {
    Message.findAll({order: [['createdAt']]})
    .then(messages => {
        res.status(200).json(messages);
    })
    .catch(err => {
        res.status(400).json(err);
    });
}

//GET one by id (get api/messages/:id)
const getOneByPk = (req, res) => {
    const {id} = req.params;
    if (!id) {
        res.status(400).json({error: "Provide id of message"});
    }
    Message.findByPk(id)
    .then(message => {
        if(!message) {
            res.status(404).json();
            return;
        }
        res.status(200).json(message);
    })
    .catch(err => {
        res.status(400).json(err);
    });
}

//Add new message (post api/messages)
const post = (req, res) => {
    const {title} = req.body;
    const message = Message.build({title});
    message.validate()
    .then(() => {
        return message.save();
    })
    .then(savedMessage => {
        res.status(201).json(message);
    })
    .catch(err => {
        res.status(400).json(err);
    });
}

//Update message (put api/messages/:id)
const put = (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    if (!id) {
        res.status(400).json({error: "Provide id of message"});
    }
    Message.findByPk(id)
    .then(message => {
        if(!message) {
            res.status(404).json();
            return;
        }
        return message.update({title})
    })
    .then(updated => {
        res.status(204).json();
    })
    .catch(err => {
        res.status(400).json(err);
    });
}

//DELETE message (DELETE api/messages:id)
// delete is js keyword
// 200 - ok
// 202 - accepted but not done
// 204 - done but no entity returned
const remove = (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    if (!id) {
        res.status(400).json({error: "Provide id of message"});
    }
    Message.findByPk(id)
    .then(message => {
        if(!message) {
            res.status(404).json();
            return;
        }
        return message.destroy()
    })
    .then(() => {
        res.status(204).json();
    })
    .catch(err => {
        res.status(400).json(err);
    });
}

exports.messageController = {getAll, post, getOneByPk, put, remove};