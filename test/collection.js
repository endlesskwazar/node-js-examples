process.env.NODE_ENV = 'test';

let chai = require('chai');
let { app } = require('../');
let { User } = require('../models');
let { Collection } = require('../models');

describe('/GET collections', () => {

    before(done => {
        chai.request(app)
            .post('/register')
            .type('form')
            .send({ 'email': 'test@test.com', 'password': 'test' })
            .end(async (err, res) => {
                const user = await User.findOne({ where: { email: 'test@test.com' } });
                await Collection.create({ title: 'testCollection', userId: user.id });
                done();
            });
    });

    it('should redirect if user not logged in', done => {
        chai.request(app)
            .get('/collections')
            .end(async (err, res) => {
                chai.expect(res.text).contain("Login");
                chai.expect(res.text).contain("Password");
                chai.expect(res.text).contain("Submit");
                done();
            });
    });


    it('should display collections page if user logged', done => {
        let agent = chai.request.agent(app);
        agent.post('/login')
            .type('form')
            .send({ 'email': 'test@test.com', 'password': 'test' })
            .then(res => {
                agent.get('/collections')
                    .then(res2 => {
                        chai.expect(res2.text).contain('<h1>Books Collections</h1>');
                        chai.expect(res2.text).contain('testCollection');
                        done();
                    })
            })
    });

    after(done => {
        Collection.destroy({
            where: {},
            truncate: true
        })
        .then(() => {
            return User.destroy({
                where: {},
                truncate: true
            });
        })
        .then(() => {
            done();
        });
    });

});

describe('/POST /collections/create', () => {

    before(done => {
        chai.request(app)
            .post('/register')
            .type('form')
            .send({ 'email': 'test@test.com', 'password': 'test' })
            .end(async (err, res) => {
                const user = await User.findOne({ where: { email: 'test@test.com' } });
                await Collection.create({ title: 'testCollection', userId: user.id });
                done();
            });
    });

    it('it should create collection', done => {
        var agent = chai.request.agent(app)
        agent
            .post('/login')
            .type('form')
            .send({ 'email': 'test@test.com', 'password': 'test' })
            .then(function (res) {
                agent.post('/collections/create')
                  .type('form')
                  .send({ title: 'newCollection' })
                  .then(res2 => {
                    chai.expect(res2.text).contain('<h1>Books Collections</h1>');
                    chai.expect(res2.text).contain('newCollection');
                      done();
                  })
            });
    });


    after(done => {
        
        Collection.destroy({
            where: {},
            truncate: true
        })
        .then(() => {
            return User.destroy({
                where: {},
                truncate: true
            });
        })
        .then(() => {
            done();
        });

    });
});