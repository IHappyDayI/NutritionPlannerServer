import { Recipe } from '../models/recipe';
const knexfile = require('./../../knexfile.js');

const knex = require("knex")(knexfile.development);

const recipies = [
    { name: 'suppe', description: 'test1' },
    { name: 'brot', description: 'test2' },
    { name: 'kartoffel', description: 'test3' },
]

export class RecipeRepo {

    static async getAll(): Promise<any> {
        var data = await knex.from('recipe').select("*");
        let result: Recipe[] = [];
        for (var row of data) {
            result.push(new Recipe(row['id'], row['name'], row['description'], row['workflow']));
        }

        return result;
    }

    static insertData() {
        knex('recipe').insert(recipies).then(() => console.log("data inserted"))
        .catch((err: any) => { console.log(err); throw err })
        .finally(() => {
            knex.destroy();
        });
    }
};
