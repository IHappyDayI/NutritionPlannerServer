import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiUUID from 'chai-uuid';
import knex from 'knex';
import { clearDatabase } from '../testUtility';

chai.use(chaiHttp);
chai.use(chaiUUID);
const expect = chai.expect;
const db = knex(require('../../knexfile.js')['test']);

const validTestRecipes = [
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
    for (const recipe of validTestRecipes) {
      await chai.request("localhost:3000")
        .post('/api/v1/recipe')
        .send(recipe);
    }

    const res = await chai.request("localhost:3000")
      .get('/api/v1/recipe')

    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body).to.be.of.length(validTestRecipes.length);
    for (var i = 0; i < res.body; i++) {
      var recipe = res.body[i]
      delete recipe.id;
      expect(recipe).to.eql(validTestRecipes[i]);
    }
  });
});

describe('POST api/v1/recipe', () => {
  it('should return 200 and the new recipe with id when using valid request parameters', async () => {
    const res = await chai.request("localhost:3000")
      .post('/api/v1/recipe')
      .send(validTestRecipes[1]);

    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body).to.haveOwnProperty('id').with.uuid('v4');
    var initialRecipe = res.body;
    delete initialRecipe.id;
    expect(initialRecipe).to.eql(validTestRecipes[1]);
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

  it('should return 422 when an unexpected parameter is passed in the request', async () => {
    const res = await chai.request("localhost:3000")
      .post('/api/v1/recipe')
      .send({
        name: "Barbie Queue",
        unexpectedParameter: "123",
        description: "yup",
        workflow: "Q Q Q Q"
      });

    expect(res.status).to.equal(422);
    expect(res).to.be.json;
  });
});

describe('GET api/v1/recipe/:id', () => {
  it('should return the specified recipe', async () => {
    var recipeIds = []
    for (const recipe of validTestRecipes) {
      const arrangeRes = await chai.request("localhost:3000")
        .post('/api/v1/recipe')
        .send(recipe);
      recipeIds.push(arrangeRes.body.id);
    }

    const res = await chai.request("localhost:3000")
      .get('/api/v1/recipe/' + recipeIds[1])

    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    var recipe = res.body
    expect(recipe.id).to.eql(recipeIds[1]);
    delete recipe.id;
    expect(recipe).to.eql(validTestRecipes[1]);
  });
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
