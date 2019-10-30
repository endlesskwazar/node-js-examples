process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let {app} = require('../');
let {User} = require('../models');

chai.use(chaiHttp);

describe('/GET register', () => {
    it('it should displays register form', done => {
        chai.request(app)
        .get('/register')
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.text).contain('Login');
            chai.expect(res.text).contain('Password');
            done();
        });
    });
});

describe('/POST register', () => {
    it('it should display validation errors', done => {
        chai.request(app)
        .post('/register')
        .type('form')
        .send({'email': '', 'password': ''})
        .end((err, res) => {
            chai.expect(res.text).contain('Validation notEmpty on email failed');
            chai.expect(res.text).contain('Validation isEmail on email failed');
            chai.expect(res.text).contain('Validation notEmpty on password failed');
            done();
        });
    });

    it('it should create user in database', done => {
        chai.request(app)
        .post('/register')
        .type('form')
        .send({'email': 'test@test.com', 'password': 'test'})
        .end(async (err, res) => {
            chai.expect(res).to.have.status(200);
            const user = await User.findOne({where: {email: 'test@test.com'}});
            chai.expect(user).to.not.be.null;
            done();
        });
    });
});

describe('/GET login', () => {

    before(done => {
        chai.request(app)
        .post('/register')
        .type('form')
        .send({'email': 'test@test.com', 'password': 'test'})
        .end((err, res) => {
            done();
        })
    });

    it('it should display login form', done => {
        chai.request(app)
        .get('/login')
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.text).contain('Login');
            chai.expect(res.text).contain('Password');
            chai.expect(res.text).contain('Submit');
            done();
        });
    });

    it('it should logged user', done => {
        chai.request(app)
        .post('/login')
        .type('form')
        .send({'email': 'test@test.com', 'password': 'test'})
        .end((err, res) => {
            chai.expect(res).to.redirect;
            done();
        });
    });

    after(done => {
        User.destroy({
                where: {},
                truncate: true
        })
        .then(() => {
            done();
        });
    });

    
});