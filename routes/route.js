var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/', controllers.indexController);
router.all('/students', controllers.addStudent);

module.exports.router = router;