import httpStatus from 'http-status';
import { ApiError } from '../utils/ApiError';
import logger from '../config/logger';
import type { Request, Response, NextFunction } from 'express';

export class ErrorHandler {

    public errorConverter(
        err: { isOperational?: boolean; message: any; stack?: any; statusCode?: number; }, _req: Request, _res: Response, next: NextFunction
    ): void {
        let error = err;
        if (!(error instanceof ApiError)) {
            const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
            const message = error.message || httpStatus[statusCode];
            error = new ApiError(statusCode, message, false, err.stack);
        }
        next(error);
    }

    public errorHandler(
        err: { isOperational?: boolean; message: any; stack?: any; statusCode?: number; ipAddress?: string },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        req: Request, res: Response, _next: NextFunction
    ): void {
        let { message, statusCode } = err;
        err.ipAddress = req.ip;

        const response = {
            code: statusCode,
            message,
            ...({ stack: err.stack })
        };

        logger.error(err);

        res.status(statusCode).send(response);
    }

}
