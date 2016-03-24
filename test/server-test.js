'use strict';
const chai = require('chai');
chai.use(require('chai-http'));

const request = chai.request;
const expect = chai.expect;

var mongoose = require('mongoose');
let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

describe('server and authentication testing', () => {

  before(done => {
    request('localhost:3000')
    .get('/users/setup')
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });


  it('should login user tad with correct password', (done) => {
    request('localhost:3000')
    .post('/login')
    .set({"authorization": "basic dGFkOm1lb3c="})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      expect(res.body.token).not.eql(undefined);
      done();
    })
  });

  it('should fail to login user tad with incorrect password', (done) => {
    request('localhost:3000')
    .post('/login')
    .set({"authorization": "basic hjalp="})
    .end((err, res) => {
      expect(res).status(400);
      expect(res.body.token).eql(undefined);
      done();
    })
  });


  after((done) => {
  mongoose.connection.db.dropDatabase((err) => {
    if (err) console.log('error dropping database');
    else console.log('database dropped');
    done();
  });
});

});
