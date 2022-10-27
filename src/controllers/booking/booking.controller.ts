import { Router, Request, Response } from "express";
import httpStatus from "http-status";
import { BookingManager } from './booking.manager';
import catchAsync from "../../utils/asyncWrapper";
import { BookingValidation } from './booking.validation';


export class BookingController {
    public router = Router();
    private _bookingManager = new BookingManager();
    private _bookingValidation = new BookingValidation();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/',
            catchAsync(this._bookingValidation.createBooking),
            catchAsync(this.createBooking.bind(this))
        );
    }

    private createBooking = async (request: Request, response: Response) => {
        const booking = await this._bookingManager.createBooking(request.body);
        response.status(httpStatus.CREATED).send(booking);
    }
}