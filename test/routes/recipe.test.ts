import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../../src/App';
import knex from 'knex';
import { clearDatabase } from '../testUtility';

chai.use(chaiHttp);
const expect = chai.expect;
const db = knex(require('../../knexfile.js')['test']);

describe('GET api/v1/recipe', () => {
  beforeEach(done => {
    clearDatabase().then(() => {
      done();
    });
  });

  after(done => {
    db.destroy().then(() => {
      done();
    });
  });

  it('should return all recipes', () => {
    return chai.request(app).get('/api/v1/recipe')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
      });
  });
});
