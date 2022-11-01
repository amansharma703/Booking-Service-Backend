import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../utils/ApiError'
import httpStatus from 'http-status';

export class BookingValidation {

    public createBooking = (request: Request, response: Response, next: NextFunction) => {
        const schema: ObjectSchema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            seatIds: Joi.array().items(Joi.string())
        })

        const result = schema.validate(request.body);

        if (result.error) {
            throw new ApiError(httpStatus.BAD_REQUEST, result.error.message.split(`\"`).join(''));
        }
        next();
    };

    public getBookingDetails = (request: Request, response: Response, next: NextFunction) => {
        const schema: ObjectSchema = Joi.object().keys({
            userIdentifier: Joi.string().required(),
        })

        const result = schema.validate(request.query);

        if (result.error) {
            throw new ApiError(httpStatus.BAD_REQUEST, result.error.message.split(`\"`).join(''));
        }
        next();
    };
}
