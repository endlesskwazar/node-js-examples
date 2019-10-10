var {Student} = require('../models/student');

module.exports.addStudent = (req, res) => {
    if(req.body.name){
        Student.addStudent({
            name: req.body.name,
            age: req.body.age
        })
        .then(data => {
            res.redirect('/');
        }).catch(err => {
            console.log(err);
        });
    }else {
        res.render('add');
    }
}