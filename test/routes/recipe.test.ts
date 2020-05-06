import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiUUID from 'chai-uuid';
import knex from 'knex';
import { clearDatabase } from '../testUtility';

chai.use(chaiHttp);
chai.use(chaiUUID);
const expect = chai.expect;
const db = knex(require('../../knexfile.js')['test']);

const testRecipes = [
  {
    name: "Oma's Lebkuchenrezept",
    ingredient: "leb",
    description: "Hmm, lecker",
    workflow: "1., 2., 3."
  },
  {
    name: "Bratkartoffeln à la Spaceship",
    ingredient: "Kartoffeln",
    description: "So tasty, you'll die and your soul will fly to space looking for more",
    workflow: "Potatoes + Magic" 
  },
]

beforeEach(() => clearDatabase(db));
after(() => clearDatabase(db).then(() => db.destroy()));

describe('GET api/v1/recipe', () => {
  it('should return all recipes', async () => {
    const res = await chai.request("localhost:3000")
      .get('/api/v1/recipe')
      
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
  });
});

describe('POST api/v1/recipe', () => {
  it('should add a new recipe');
  it('should return the new recipe', async () => {
    const res = await chai.request("localhost:3000")
      .post('/api/v1/recipe')
      .send(testRecipes[1]);

    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body).to.have.property('id').and.to.be.uuid('v4');
    expect(res.body).to.have.property('name').and.to.be.a('string');
    expect(res.body).to.have.property('ingredient').and.to.be.a('string');
    expect(res.body).to.have.property('description').and.to.be.a('string');
    expect(res.body).to.have.property('workflow').and.to.be.an('string');
  });

  it('should return 422 when the name is missing', async () => {
    const res = await chai.request("localhost:3000")
      .post('/api/v1/recipe')
      .send({
        ingredient: "leb",
        description: "Hmm, lecker",
        workflow: "1., 2., 3."
      });

      expect(res.status).to.equal(422);
      expect(res).to.be.json;
  });
});

describe('GET api/v1/recipe/:id', () => {
  it('should return the specified recipe');
});

describe('PUT api/v1/recipe/:id', () => {
  it('should update the specified recipe');
  it('should return the updated recipe');
  it('should return 422 when a request parameter is missing');
});

describe('DELETE api/v1/recipe/:id', () => {
  it('should delete the specified recipe');
  it('should return the deleted recipe id');
});
