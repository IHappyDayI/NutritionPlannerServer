import { Router, Request, Response, NextFunction } from 'express';
import { Recipe } from '../../models/recipe';
import * as recipeService from "../../services/recipeService";

/**
 * GET all Recipes.
 */
export async function getAll(req: Request, res: Response): Promise<Response> {
  try {
    var result = await recipeService.getAll();
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
    if (!req.body.name) return res.status(422).json("missing request parameter");
    const recipe = await recipeService.add(req.body);
    return res.status(200).json(recipe);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

const recipeRouter = Router()
recipeRouter.get('/', getAll);
recipeRouter.post('/', add);

export default recipeRouter;
