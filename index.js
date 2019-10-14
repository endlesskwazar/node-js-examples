const {Student} = require('./models');

Student.findAll()
.then(students => {
    students.forEach(student => {
        console.log(`Student id:${student.id} name:${student.name}`);
    });
})
.catch(err => {
    console.log(err);
})