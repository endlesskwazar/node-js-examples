process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let {app} = require('../');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET / not logged in', () => {
    it('it should be redirected to login page', done => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.text).contain('Login');
            chai.expect(res.text).contain('Password');
            done();
        });
    });
});