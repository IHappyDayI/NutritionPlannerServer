import chai from 'chai';
import chaiHttp from 'chai-http';
import { clearDatabase } from '../testUtility';
import knex from 'knex';

chai.use(chaiHttp);
const expect = chai.expect;
const db = knex(require('../../knexfile.js')['test']);

beforeEach(() => clearDatabase(db));
after(() => clearDatabase(db).then(() => db.destroy()));

describe('GET api/v1/recipe', () => {
  it('should return all recipes', () => {
    chai.request("localhost:3000")
      .get('/api/v1/recipe')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
      })
  });

  it('should return 401 when unauthorized')
});

describe('POST api/v1/recipe', () => {
  it('should return the new recipe', () => {
    chai.request("localhost:3000")
      .post('/api/v1/recipe')
      .send()
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
      })
  });

  it('should return 422 when a request parameter is missing')
  it('should return 401 when unauthorized')
});
