import { Router, Request, Response } from "express";
import httpStatus from "http-status";
import { SeatManager } from './seat.manager';
import catchAsync from "../../utils/asyncWrapper";
import { ApiError } from "utils/ApiError";


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
        this.router.post('/:id',
            catchAsync(this.getSeatbyId.bind(this))
        );
    }

    private getAllSeats = async (request: Request, response: Response) => {
        const booking = await this._seatManager.getAllSeats();
        response.status(httpStatus.CREATED).send(booking);
    }
    private getSeatbyId = async (request: Request, response: Response) => {
        const seatId = request.params.id;
        const seatDetails = await this._seatManager.getSeatById(seatId);
        if (!seatDetails) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Seat detail not found');
        }
        response.status(httpStatus.CREATED).send(seatDetails);
    }
}