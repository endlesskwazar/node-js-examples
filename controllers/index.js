const {registerController} = require('./register-controller');
const {homeController} = require('./home-controller');
const {loginController} = require('./login-controller');
const {logoutController} = require('./logout-controller');
const {collectionController} = require('./collection-controller');
const {bookController} = require('./book-controller');

exports.registerController = registerController;
exports.homeController = homeController;
exports.loginController = loginController;
exports.logoutController = logoutController;
exports.collectionController = collectionController;
exports.bookController = bookController;