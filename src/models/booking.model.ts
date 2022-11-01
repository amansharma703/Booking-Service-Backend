import { Schema, model } from 'mongoose';

export interface Booking {
    id?: Schema.Types.ObjectId;
    name: string;
    email: string;
    mobile: number;
    seatIds: string[];
    amount: number;
}

export const schema = new Schema<Booking>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            sparse: true,
        },
        mobile: {
            type: Number,
        },
        seatIds: [{
            type: String,
            required: true,
        }],
        amount: {
            type: Number,
            required: true,
            sparse: true,
        }
    },
    {
        timestamps: true
    }
)


export const Booking = model<Booking>('Booking', schema);
