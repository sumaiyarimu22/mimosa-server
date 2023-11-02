"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
const booking_controller_1 = __importDefault(require("../controllers/booking.controller"));
const bookingRouter = express_1.default.Router();
const authInstance = new auth_middlewares_1.default();
const bookingInstance = new booking_controller_1.default();
//create a booking
bookingRouter.post('/create/:bid', authInstance.isAuthentcated, bookingInstance.createABooking);
//delete a booking
bookingRouter.delete('/:bid', authInstance.isAuthentcated, bookingInstance.deleteABooking);
//get all bookings
bookingRouter.get('/', authInstance.isAuthentcated, authInstance.isAdmin, bookingInstance.getAllBooking);
exports.default = bookingRouter;
