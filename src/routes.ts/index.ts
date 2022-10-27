import { BookingController } from '../controllers/booking/booking.controller';
import { SeatController } from '../controllers/seat/seat.controller';
import { Router } from 'express';

const router = Router();

const routes = [
    {
        path: '/booking',
        route: new BookingController().router
    },
    {
        path: '/seats',
        route: new SeatController().router
    }
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
