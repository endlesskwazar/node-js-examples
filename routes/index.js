const express = require('express');
const {registerController} = require('../controllers');
const {homeController} = require('../controllers');
const {loginController} = require('../controllers');
const {logoutController} = require('../controllers');
const {protect} = require('../middlewares/protect');

router = express.Router();

router.get('/register', registerController.get);
router.post('/register', registerController.post);
router.get('/', protect, homeController.get);
router.get('/login', loginController.get);
router.post('/login', loginController.post);
router.get('/logout', logoutController);

exports.routes = router;
