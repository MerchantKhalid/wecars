import { Router } from 'express';
import {
  createBooking,
  getBookings,
  updateBooking,
} from '../controllers/bookings.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, createBooking);
router.get('/', authenticate, getBookings);
router.put('/:bookingId', authenticate, updateBooking);

export default router;
