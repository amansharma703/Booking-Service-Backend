import { Router, Request, Response, request } from "express";
import httpStatus from "http-status";
import { BookingManager } from './booking.manager';
import catchAsync from "../../utils/asyncWrapper";
import { BookingValidation } from './booking.validation';
import { SeatManager } from "../seat/seat.manager";
import { ApiError } from "../../utils/ApiError";
import { Seat } from "../../models/seat.model";
import { validateEmail, validatePhoneNumber } from "../../utils/helper";


export class BookingController {
    public router = Router();
    private _bookingManager = new BookingManager();
    private _seatManager = new SeatManager();
    private _bookingValidation = new BookingValidation();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/',
            catchAsync(this._bookingValidation.createBooking),
            catchAsync(this.createBooking.bind(this))
        );
        this.router.get('/',
            catchAsync(this._bookingValidation.getBookingDetails),
            catchAsync(this.getBookingDetails.bind(this))
        );
    }

    private createBooking = async (request: Request, response: Response) => {
        const seatIds = request.body.seatIds;
        let amount: number = 0;
        for (const seatId of seatIds) {
            const seatDetails: Seat = await this._seatManager.getSeatById(seatId);
            if (!seatDetails) {
                throw new ApiError(httpStatus.NOT_FOUND, 'Seat details not found');
            }
            if (seatDetails.isBooked) {
                throw new ApiError(httpStatus.NOT_FOUND, 'Oops! Seat Already Booked');
            }
            const price = await this._seatManager.getBookingPrice(seatDetails);
            amount += price;
        }

        const booking = await this._bookingManager.createBooking(request.body, amount);
        await this._seatManager.updateBookingStatus(seatIds);
        response.status(httpStatus.CREATED).send({ "bookingId": booking._id, "amount": booking.amount });
    }

    private getBookingDetails = async (request: Request, response: Response) => {
        const { userIdentifier } = request.query;
        const query = userIdentifier as string;
        let isEmailQuery: boolean;
        if (validateEmail(query)) {
            isEmailQuery = true;
        } else if (validatePhoneNumber(query)) {
            isEmailQuery = false;
        } else {
            throw new ApiError(httpStatus.NOT_FOUND, 'Not a valid email or phone mumber');
        }
        const bookingDetails = await this._bookingManager.getBookingDetails(query, isEmailQuery);
        if (!bookingDetails) {
            throw new ApiError(httpStatus.NOT_FOUND, 'No Booking Found');
        }
        response.status(httpStatus.CREATED).send(bookingDetails);

    }
}