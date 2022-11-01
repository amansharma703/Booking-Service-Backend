import { Router, Request, Response } from "express";
import httpStatus from "http-status";
import { SeatManager } from './seat.manager';
import catchAsync from "../../utils/asyncWrapper";
import { ApiError } from "../../utils/ApiError";


export class SeatController {
    public router = Router();
    private _seatManager = new SeatManager();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/',
            catchAsync(this.getAllSeats.bind(this))
        );
        this.router.get('/:id',
            catchAsync(this.getSeatbyId.bind(this))
        );
    }

    private getAllSeats = async (request: Request, response: Response) => {
        const seats = await this._seatManager.getAllSeats();
        response.status(httpStatus.OK).send(seats);
    }
    private getSeatbyId = async (request: Request, response: Response) => {
        const seatId = request.params.id;
        const seatDetails = await this._seatManager.getSeatById(seatId);
        if (!seatDetails) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Seat detail not found');
        }

        const percentageBooked = await this._seatManager.getBookingPercentage();

        let price: number;
        if (percentageBooked > 60) {
            price = seatDetails?.maxPrice ? seatDetails.maxPrice : seatDetails.normalPrice;
        } else if (percentageBooked <= 60 && percentageBooked >= 40) {
            price = seatDetails?.normalPrice ? seatDetails.normalPrice : seatDetails.maxPrice;
        } else {
            price = seatDetails?.minPrice ? seatDetails.minPrice : seatDetails.normalPrice;
        }

        let seat = seatDetails.toObject();
        seat.price = price;

        response.status(httpStatus.OK).send(seat);
    }
}