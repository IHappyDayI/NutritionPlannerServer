import { Router, Request, Response, NextFunction } from 'express';
import { Recipe } from '../../models/recipe';
import { addRecipe, getAllRecipes, recipeValidationRules, getRecipeById } from "../../services/recipeService";
import { validate } from "../../middleware/expressValidator";

/**
 * GET all Recipes.
 */
export async function getAll(req: Request, res: Response): Promise<Response> {
  try {
    var result = await getAllRecipes();
    return res.status(200).json(result);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

/**
 * POST a new Recipe.
 */
export async function add(req: Request<{}, {}, Recipe>, res: Response): Promise<Response> {
  try {
    const recipe = await addRecipe(req.body);
    return res.status(200).json(recipe);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

/**
 * GET a specific Recipe.
 */
export async function get(req: Request, res: Response): Promise<Response> {
  try {
    const recipe: Recipe = await getRecipeById(req.params.id);
    if (recipe == undefined) {
      return res.status(404).json({message: "Resource not found"});
    }
    return res.status(200).json(recipe);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

const recipeRouter = Router() 
recipeRouter.get('/', getAll);
recipeRouter.post('/', recipeValidationRules(), validate, add);
recipeRouter.get('/:id', get);

export default recipeRouter;
