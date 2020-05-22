import express, { NextFunction } from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import recipeRouter from './api/routes/recipeRouter';
import { handleErrors } from './middleware/errorHandler'

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.errorHandlers();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);
    this.express.use('/api/v1/recipe', recipeRouter);
  }

  private errorHandlers(): void {
    this.express.use(handleErrors);
  }
}

export default new App().express;
