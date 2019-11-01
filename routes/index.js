const express = require('express');

const {messageController} = require('../controllers');

router = express.Router();

router.get('/api/messages', messageController.getAll);
router.get('/api/messages/:id', messageController.getOneByPk);
router.post('/api/messages', messageController.post);
router.put('/api/messages/:id', messageController.put);
router.delete('/api/messages/:id', messageController.remove);


exports.routes = router;
