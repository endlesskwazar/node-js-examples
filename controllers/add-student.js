var {Student} = require('../models/student');

module.exports.addStudent = (req, res) => {
    if(req.body.name){
        Student.addStudent({
            name: req.body.name,
            age: req.body.age
        })
        .then(res => {
            res.redirct('/');
        });
    }
    
    res.render('add');
}