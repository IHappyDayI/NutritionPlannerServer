import * as recipeRepo from "../repositories/recipeRepo";
import { Recipe } from '../models/recipe';

export async function getAll(): Promise<Recipe[]> {
    return recipeRepo.getAll();
}  

export async function add(recipe: Recipe): Promise<Recipe> {
    return recipeRepo.insert(recipe);
}
