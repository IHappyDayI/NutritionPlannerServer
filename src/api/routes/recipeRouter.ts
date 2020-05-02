import {Router, Request, Response, NextFunction} from 'express';

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
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.send('Here are all recipes');
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
  }

}

// Create the RecipeRouter, and export its configured Express.Router
const recipeRoutes = new RecipeRouter();
recipeRoutes.init();

export default recipeRoutes.router;