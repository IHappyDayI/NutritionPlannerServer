import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './errorHandler';

export async function validate(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    
    const firstError: any = validationResult(req).array({onlyFirstError: true})[0];
    var error: ValidationError = new ValidationError(firstError.msg);
    return res.status(error.status).json({ error })
}
