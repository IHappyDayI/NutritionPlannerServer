import { Recipe } from '../models/recipe';
import { getAll, insert, getById } from "../repositories/recipeRepo";
import { header, body } from 'express-validator';

export async function getAllRecipes(): Promise<Recipe[]> {
    return getAll();
}  

export async function addRecipe(recipe: Recipe): Promise<Recipe> {
    return insert(recipe);
}

export async function getRecipeById(id: string): Promise<Recipe> {
    return getById(id);
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
