import chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /', () => {
  it('should return "Hello World!"', () => {
    chai.request("localhost:3000")
    .get('/')
    .then(res => {
      expect(res.type).to.eql('application/json');
      expect(res.body.message).to.eql('Hello World!');
    });
  });
});
