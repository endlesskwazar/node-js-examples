const express = require('express');
const {registerController} = require('../controllers');
const {homeController} = require('../controllers');
const {loginController} = require('../controllers');
const {logoutController} = require('../controllers');
const {protect} = require('../middlewares/protect');
const {collectionController} = require('../controllers');
const {bookController} = require('../controllers');
const {csrfProtection} = require('../middlewares/csrfProtection');
var bodyParser = require('body-parser')
var parseForm = bodyParser.urlencoded({ extended: false })

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
router.get('/collections/create', csrfProtection, protect, collectionController.getForm);
router.post('/collections/create', csrfProtection, protect, collectionController.post);
router.delete('/collections/:id', protect, collectionController.remove);

// Books
router.get('/books', protect, bookController.getAll);
router.get('/books/create', csrfProtection, protect, bookController.getForm);
router.post('/books/create', csrfProtection, bookController.post);
router.delete('/books/:id', protect, bookController.remove);
router.get('/books/update/:id', protect, bookController.getUpdate);

exports.routes = router;
