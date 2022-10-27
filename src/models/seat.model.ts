import { Schema, model } from 'mongoose';

export interface Seat {
    id?: Schema.Types.ObjectId;
    name: string;
    mobile: string;
    seatIds: string[];
}

export const schema = new Schema<Seat>(
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


export const Seat = model<Seat>('Seat', schema);
