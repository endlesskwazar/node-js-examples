const express = require('express');
const passport = require('passport');

const {authController} = require('../controllers');
const {userController} = require('../controllers');

router = express.Router();

router.post('/api/register', authController.register);
router.post('/api/login', authController.login);

router.get('/api/users', passport.authenticate('jwt', { session: false }), userController.getAll);

exports.routes = router;
