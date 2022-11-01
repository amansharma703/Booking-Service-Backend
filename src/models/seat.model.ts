import { Schema, model } from 'mongoose';

export interface Seat {
    id?: Schema.Types.ObjectId;
    seatId: string;
    seatClass: string;
    maxPrice: number;
    minPrice: number;
    price: number;
    isBooked: boolean;
}

export const schema = new Schema<Seat>(
    {
        seatId: {
            type: String,
            required: true,
        },
        seatClass: {
            type: String,
            required: true,
        },
        maxPrice: {
            type: Number,
        },
        minPrice: {
            type: Number,
        },
        price: {
            type: Number,
        },
        isBooked: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
)


export const Seat = model<Seat>('Seat', schema);
