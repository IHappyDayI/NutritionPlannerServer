import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export async function validate(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return res.status(422).json(errors)
}
