const { expect } = require('chai');
const chai = require('chai');
const chaiHttpRequest = require('chai-http');
const app = require('../src/app');


chai.should();

chai.use(chaiHttpRequest);

describe('test login', () => {
    // login page
    describe('Get /login', () => {
        it('should return token', (done) => {
            chai.request(app)
                .post('/user/login')
                .send({username: 'email@email.com'})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.string();
                    done();
                });
        })
    })
})