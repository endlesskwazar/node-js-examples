var {Student} = require('../models/student');

module.exports.indexController = (req, res) => {

	Student.getAll()
	.then(data => {
		res.render('home', {students: data});
	});
}

//controllers/index.js
