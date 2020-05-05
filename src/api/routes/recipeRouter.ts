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
  public async getAll(req: Request, res: Response) {
    var result = await RecipeRepo.getAll();
    return res.status(200).json({message: result});
  }

  /**
   * POST some new Recipes.
   */
  public async add(req: Request, res: Response) {
    try {
      const {name, ingredient, description, workflow} = req.body;
      if (!name) return res.status(422).json({message: "missing request parameters"});
      await RecipeRepo.insert(name, ingredient, description, workflow).then((id) => {
        return res.status(200).json({ id, ...req.body })
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err });
    }
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.post('/', this.add);
  }

}

// Create the RecipeRouter, and export its configured Express.Router
const recipeRoutes = new RecipeRouter();
recipeRoutes.init();

export default recipeRoutes.router;
