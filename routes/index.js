const express = require('express');
const {registerController} = require('../controllers');
const {homeController} = require('../controllers');
const {loginController} = require('../controllers');
const {logoutController} = require('../controllers');
const {protect} = require('../middlewares/protect');
const {collectionController} = require('../controllers');
const {bookController} = require('../controllers');

router = express.Router();

//Auth
router.get('/register', registerController.get);
router.post('/register', registerController.post);
router.get('/login', loginController.get);
router.post('/login', loginController.post);
router.get('/logout', logoutController);

//Index
router.get('/', protect, homeController.get);

// Collections
router.get('/collections', protect, collectionController.getAll);
router.get('/collections/create', protect, collectionController.getForm);
router.post('/collections/create', protect, collectionController.post);
router.delete('/collections/:id', protect, collectionController.remove);

// Books
router.get('/books', protect, bookController.getAll);
router.get('/books/create', protect, bookController.getForm);
router.post('/books/create', protect, bookController.post);
router.delete('/books/:id', protect, bookController.remove);
router.get('/books/update/:id', protect, bookController.getUpdate);

exports.routes = router;
