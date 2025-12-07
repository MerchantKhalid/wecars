import { Request, Response } from 'express';
import * as bookingService from '../services/bookings.service';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.createNewBooking(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: 'Booking created successfully',
        data: booking,
      });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getBookings(req.user!);
    res
      .status(200)
      .json({
        success: true,
        message: 'Bookings retrieved successfully',
        data: bookings,
      });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (!['cancelled', 'returned'].includes(status))
      throw new Error('Invalid status');

    const updated = await bookingService.modifyBooking(
      Number(req.params.bookingId),
      req.user!,
      status
    );
    const msg =
      status === 'cancelled'
        ? 'Booking cancelled successfully'
        : 'Booking marked as returned. Vehicle is now available';
    res.status(200).json({ success: true, message: msg, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
