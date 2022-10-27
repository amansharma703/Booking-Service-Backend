import type { Request, Response, RequestHandler, NextFunction } from 'express';

const catchAsync = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default catchAsync;