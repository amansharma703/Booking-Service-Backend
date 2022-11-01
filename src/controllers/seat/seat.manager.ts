import { Seat } from "../../models/seat.model";
import { ObjectId } from "mongoose";

export class SeatManager {
    public getAllSeats = async (): Promise<Seat[]> => {
        return Seat.find();
    }
    public getSeatById = async (seatId: string) => {
        return Seat.findOne({ seatId });
    }
    public getBookingPrice = async (seat: Seat) => {
        const seatBooked = await Seat.countDocuments({ isBooked: true });
        const totalSeats = await Seat.countDocuments();
        const percentageBooked = (seatBooked / totalSeats) * 100;
        let price: number;
        if (percentageBooked > 60) {
            price = seat?.maxPrice ? seat.maxPrice : seat.normalPrice;
        } else if (percentageBooked <= 60 && percentageBooked >= 40) {
            price = seat?.normalPrice ? seat.normalPrice : seat.maxPrice;
        } else {
            price = seat?.minPrice ? seat.minPrice : seat.normalPrice;
        }
        return price;
    }

    public updateBookingStatus = async (seatIds: string[]) => {
        await Seat.updateMany({ 'seatId': { $in: seatIds } }, {
            $set: {
                isBooked: true,
            }
        });
    }
}