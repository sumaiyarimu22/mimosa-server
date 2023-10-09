import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middlewares';
import BookingController from '../controllers/booking.controller';

const bookingRouter: Router = express.Router();
const authInstance = new AuthMiddleware();
const bookingInstance = new BookingController();

//create a booking
bookingRouter.post(
  '/create/:bid',
  authInstance.isAuthentcated,
  bookingInstance.createABooking
);

//delete a booking
bookingRouter.delete(
  '/:bid',
  authInstance.isAuthentcated,
  bookingInstance.deleteABooking
);

//get all bookings
bookingRouter.get(
  '/',
  authInstance.isAuthentcated,
  authInstance.isAdmin,
  bookingInstance.getAllBooking
);

export default bookingRouter;
