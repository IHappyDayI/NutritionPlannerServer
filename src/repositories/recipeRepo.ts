import knex from 'knex';
import { Recipe } from '../models/recipe';
import { v4 as uuid } from 'uuid';

const db = knex(require('../../knexfile.js')['test']);

export async function getAll(): Promise<Recipe[]> {
    return await db.from('recipe').select("*") as Recipe[];
}

export async function insert(recipe: Recipe): Promise<Recipe> {
    recipe.id = uuid();
    await db('recipe').insert(recipe);
    return recipe;
}

export async function getById(id: string): Promise<Recipe> {
    return await db.from('recipe')
        .select("*")
        .where({id: id})
        .first() as Recipe;
}

export async function deleteById(id: string): Promise<any> {
    await db.from('recipe')
        .select("*")
        .where({id: id})
        .first()
        .then((err) => {console.log(err)});
    return await db('recipe')
        .where({ id: id })
        .del()
}
