import {
  Booking,
  createBooking,
  getAllBookings,
  getBookingsByCustomer,
  getBookingById,
  updateBooking,
} from '../models/booking.model';
import { pool } from '../database/db';

export const createNewBooking = async (bookingData: Booking) => {
  // Check vehicle availability
  const vehicleRes = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    bookingData.vehicle_id,
  ]);
  const vehicle = vehicleRes.rows[0];
  if (!vehicle) throw new Error('Vehicle not found');
  if (vehicle.availability_status === 'booked')
    throw new Error('Vehicle is not available');

  // Calculate total price
  const start = new Date(bookingData.rent_start_date);
  const end = new Date(bookingData.rent_end_date);
  if (end <= start) throw new Error('End date must be after start date');

  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
  );
  bookingData.total_price = vehicle.daily_rent_price * days;

  // Create booking
  const booking = await createBooking(bookingData);

  // Update vehicle status to booked
  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [bookingData.vehicle_id]
  );

  return {
    ...booking,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

export const getBookings = async (user: { id: number; role: string }) => {
  if (user.role === 'admin') {
    return await getAllBookings();
  } else {
    return await getBookingsByCustomer(user.id);
  }
};

export const modifyBooking = async (
  id: number,
  user: { id: number; role: string },
  status: 'cancelled' | 'returned'
) => {
  const booking = await getBookingById(id);
  if (!booking) throw new Error('Booking not found');

  // Customer can only cancel before start date
  if (status === 'cancelled' && user.role === 'customer') {
    const today = new Date();
    if (new Date(booking.rent_start_date) <= today)
      throw new Error('Cannot cancel after rental start date');
  }

  // Update booking status
  const updated = await updateBooking(id, { status });

  // Update vehicle availability if cancelled or returned
  if (status === 'cancelled' || status === 'returned') {
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );
  }

  return updated;
};
