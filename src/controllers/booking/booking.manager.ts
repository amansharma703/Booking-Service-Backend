import { ApiError } from "../../utils/ApiError";
import { Booking } from "../../models/booking.model";
import httpStatus from "http-status";

export class BookingManager {
    public createBooking = async (booking: Partial<Booking>, amount: number) => {
        if (booking.email && await Booking.isEmailTaken(booking.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        }
        Object.assign(booking, { amount: amount });
        return Booking.create(booking);
    }

    public getBookingDetails = async (query: string, isEmail: boolean) => {
        if (isEmail) {
            return Booking.findOne({ 'email': query, });
        } else {
            return Booking.findOne({ 'mobile': Number(query) });
        }
    }
}