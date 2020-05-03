import { Router, Request, Response, NextFunction } from 'express';
import { RecipeRepo } from '../../repositories/recipeRepo';

export class RecipeRouter {
  router: Router

  /**
   * Initialize the RecipeRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Recipes.
   */
  public async getAll(req: Request, res: Response, next: NextFunction) {
    var result = await RecipeRepo.getAll();
    return res.status(200).json({message: result});
  }

  /**
   * POST some new Recipe.
   */
  public insertSeeds(req: Request, res: Response, next: NextFunction) {
    RecipeRepo.insertData();
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.post('/', this.insertSeeds);
  }

}

// Create the RecipeRouter, and export its configured Express.Router
const recipeRoutes = new RecipeRouter();
recipeRoutes.init();

export default recipeRoutes.router;