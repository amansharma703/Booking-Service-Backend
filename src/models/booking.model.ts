import { Schema, model } from 'mongoose';

export interface Booking {
    id?: Schema.Types.ObjectId;
    name: string;
    mobile: string;
    seatIds: string[];
}

export const schema = new Schema<Booking>(
    {
        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
        },
        seatIds: [{
            type: String,
        }]
    },
    {
        timestamps: true
    }
)


export const User = model<Booking>('Booking', schema);
