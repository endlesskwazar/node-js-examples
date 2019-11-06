const express = require('express');
const passport = require('passport');

const {authController} = require('../controllers');
const {userController} = require('../controllers');
const {messageController} = require('../controllers');

const {messageOwnerRequired} = require('../auth/message-owner-required');

router = express.Router();

router.post('/api/register', authController.register);
router.post('/api/login', authController.login);

// users
router.get('/api/users', passport.authenticate('jwt', { session: false }), userController.getAll);

// messages
// post api/messages
router.post('/api/messages', passport.authenticate('jwt', { session: false }), messageController.post);
// getall api/messages
router.get('/api/messages', passport.authenticate('jwt', { session: false }), messageController.getAll);
// get one api/messages/:id
router.get('/api/messages/:id', passport.authenticate('jwt', { session: false }), messageController.getOne);
//delete api/messages/:id
router.delete('/api/messages/:id', passport.authenticate('jwt', { session: false }), messageOwnerRequired, messageController.remove);

exports.routes = router;
