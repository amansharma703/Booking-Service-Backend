import { Seat } from "../../models/seat.model";
import { ObjectId } from "mongoose";

export class SeatManager {
    public getAllSeats = async (): Promise<Seat[]> => {
        return Seat.find();
    }
    public getSeatById = async (id: ObjectId | string): Promise<Seat> => {
        return Seat.findById(id);
    }
}