var fs = require('fs');

exports.Student = class Student{
    constructor(name, age)
    {
        this.name = name;
        this.age = age;
    }

    static getAll(){
        return new Promise(resolve => {
            fs.readFile('models/students.json', (err, data) => {
                let students = JSON.parse(data);
                resolve(students);
            });
        });
    }

    static addStudent(student){
        return new Promise(resolve => {
            this.getAll()
            .then(data => {
                data.push(student);
                let res = JSON.stringify(data);

                fs.writeFile('models/students.json', res, (err) => {
                    resolve({});
                });
            })
        });
    }
}