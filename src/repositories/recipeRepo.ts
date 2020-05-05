import knex from 'knex';
import { Recipe } from '../models/recipe';
import { v4 as uuid } from 'uuid';

const db = knex(require('../../knexfile.js')['test']);

export class RecipeRepo {

    static async getAll(): Promise<any> {
        var data = await db.from('recipe').select("*");
        let result: Recipe[] = [];
        for (var row of data) {
            result.push(new Recipe(row['id'], row['name'], row['description'], row['workflow']));
        }
        return result;
    }

    static async insert(name: string, ingredient: any, description: string, workflow: any): Promise<any> {
        const recipeId = uuid();
        await db('recipe').insert({
            id: recipeId,
            name: name,
            ingredient: ingredient,
            description: description,
            workflow: workflow
        });
        return recipeId;
    }
};
