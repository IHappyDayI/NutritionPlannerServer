import { Router, Request, Response, NextFunction } from 'express';
import * as recipeRepo from "../../repositories/recipeRepo";
import { Recipe } from '../../models/recipe';

/**
 * GET all Recipes.
 */
export async function getAll(req: Request, res: Response) {
  var result = await recipeRepo.getAll();
  return res.status(200).json({message: result});
}

/**
 * POST some new Recipes.
 */
export async function add(req: Request, res: Response) {
  try {
    const inRecipe: Recipe = req.body;
    console.log(inRecipe);
    if (!inRecipe.name) return res.status(422).json({message: "missing request parameters"});
    await recipeRepo.insert(inRecipe).then((recipe) => {
      return res.status(200).json(recipe)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
}

const recipeRouter = Router()
recipeRouter.get('/', getAll);
recipeRouter.post('/', add);

export default recipeRouter;
