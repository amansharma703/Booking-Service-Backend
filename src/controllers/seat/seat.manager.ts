import { Seat } from "../../models/seat.model";
import { ObjectId } from "mongoose";

export class SeatManager {
    public getAllSeats = async (): Promise<Seat[]> => {
        return Seat.find();
    }
    public getSeatById = async (seatId: string) => {
        return Seat.findOne({ seatId });
    }
    public getBookingPercentage = async () => {
        const seatBooked = await Seat.countDocuments({ isBooked: true });
        const totalSeats = await Seat.countDocuments();
        const percentageBooked = (seatBooked / totalSeats) * 100;
        return percentageBooked;
    }
}