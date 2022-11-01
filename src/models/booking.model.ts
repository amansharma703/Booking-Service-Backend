import { Schema, model, Model } from 'mongoose';

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
            unique: true,
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

interface BookingModelInterface extends Model<Booking> {
    // declare any static methods here
    isEmailTaken(email: string, excludeUserId?: string): Promise<boolean>;
}

schema.static('isEmailTaken', async function (email: string, excludeUserId: string): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
});

export const Booking = model<Booking, BookingModelInterface>('Booking', schema);
