import { Document } from 'mongoose';
import { specialistType } from './specialist.type';
import { bookingType } from './booking.type';

export type beautyPackageType = {
  title: string;
  description: string;
  category: string;
  image: string[];
  price: number;
  specialists: specialistType[];
  bookings: bookingType[];
} & Document;
