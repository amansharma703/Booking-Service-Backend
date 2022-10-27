import { ApiError } from "../../utils/ApiError";
import { Booking } from "../../models/booking.model";
import httpStatus from "http-status";

export class BookingManager {
    public createBooking = async (booking: Partial<Booking>): Promise<Booking> => {
        return Booking.create(booking);
    }
}