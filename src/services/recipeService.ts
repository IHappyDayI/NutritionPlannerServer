import { Recipe } from '../models/recipe';
import { getAll, insert, getById, deleteById } from "../repositories/recipeRepo";
import { header, body } from 'express-validator';
import { ResourceNotFoundError } from '../middleware/errorHandler';

export async function getAllRecipes(): Promise<Recipe[]> {
    return getAll();
}

export async function addRecipe(recipe: Recipe): Promise<Recipe> {
    return insert(recipe);
}

export async function getRecipeById(id: string): Promise<Recipe> {
    const recipe: Recipe = await getById(id);
    if (recipe == undefined) {
        return Promise.reject(new ResourceNotFoundError());
    }
    return recipe;
}

export async function deleteRecipeById(id: string): Promise<any> {
    const numberOfDeletedRows = await deleteById(id);
    if (numberOfDeletedRows <= 0) {
        return Promise.reject(new ResourceNotFoundError())
    }
    return id;
}

export function recipeValidationRules() {
    return [
        header('Content-Type', 'Content type must be JSON').matches('application/json'),
        body('name')
            .exists().withMessage('Name is required')
            .isString().withMessage('Name must be a string'),
        body('ingredient', 'Ingredient must be a string').isString().optional(),
        body('description', 'Description must be a string').isString().optional(),
        body('workflow').isString().optional(),
        body().custom(doesNotHaveAdditionalProperties).withMessage('Unexpected request parameters'),
    ]
}

function doesNotHaveAdditionalProperties(object: object) {
    for (var prop in object) {
        if (!["id", "name", "ingredient", "description", "workflow"].includes(prop))
        {
            return false
        }
    }
    return true;
}
