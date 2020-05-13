import { Router, Request, Response, NextFunction } from 'express';
import { Recipe } from '../../models/recipe';
import { addRecipe, getAllRecipes, recipeValidationRules } from "../../services/recipeService";
import { validate } from "../../middleware/expressValidator";

/**
 * GET all Recipes.
 */
export async function getAll(req: Request, res: Response): Promise<Response> {
  try {
    var result = await getAllRecipes();
    return res.status(200).json({message: result});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

/**
 * POST some new Recipes.
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

const recipeRouter = Router() 
recipeRouter.get('/', getAll);
recipeRouter.post('/', recipeValidationRules(), validate, add);

export default recipeRouter;
