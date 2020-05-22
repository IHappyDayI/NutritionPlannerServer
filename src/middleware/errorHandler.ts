import { Request, Response, NextFunction } from 'express';

class ApplicationError extends Error {
    constructor(message?: string, status?: number) {
        super();
        this.status = status || 500;
        this.message = message || 'Unknown error';
    }
    
    status: number;
}

export class ResourceNotFoundError extends ApplicationError {
    constructor(message?: string) {
        super(message || "Resource not found", 404);
    }
}

export class ValidationError extends ApplicationError {
    constructor(message?: string) {
        super(message || "Invalid request", 422);
    }
}

export function errorWrapper(fn: Function) {
    return function(req: Request, res: Response, next: NextFunction) {
      // Make sure to `.catch()` any errors and pass them along to the `next()`
      // middleware in the chain, in this case the error handler.
      fn(req, res, next).catch(next);
    };
}

export async function handleErrors(error: Error, req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (error instanceof ResourceNotFoundError) {
        return res.status(error.status).json({ error });
    }
    
    const defaultError: ApplicationError = new ApplicationError;
    return res.status(defaultError.status).json({ defaultError });
};
