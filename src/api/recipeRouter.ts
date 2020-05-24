import { Router, Request, Response } from 'express';
import { Recipe } from '../models/recipe';
import { addRecipe, getAllRecipes, recipeValidationRules, getRecipeById, deleteRecipeById } from "../services/recipeService";
import { validate } from "../middleware/expressValidator";
import { errorWrapper } from '../middleware/errorHandler'

/**
 * GET all Recipes.
 */
async function getAll(req: Request, res: Response): Promise<Response> {
  const recipes: Recipe[] = await getAllRecipes();
  return res.status(200).json(recipes);
}

/**
 * POST a new Recipe.
 */
async function add(req: Request<{}, {}, Recipe>, res: Response): Promise<Response> {
  const recipe: Recipe = await addRecipe(req.body);
  return res.status(201).json(recipe);
}

/**
 * GET a specific Recipe.
 */
async function get(req: Request, res: Response): Promise<Response> {
  const recipe: Recipe = await getRecipeById(req.params.id);
  return res.status(200).json(recipe);
}

/**
 * DELETE a specific Recipe.
 */
async function remove(req: Request, res: Response): Promise<Response> {
  const id: string = await deleteRecipeById(req.params.id);
  return res.status(200).json(id);
}

const recipeRouter = Router();
recipeRouter.get('/', errorWrapper(getAll));
recipeRouter.post('/', recipeValidationRules(), validate, errorWrapper(add));
recipeRouter.get('/:id', errorWrapper(get));
recipeRouter.delete('/:id', errorWrapper(remove));

export default recipeRouter;
