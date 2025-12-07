import { pool } from '../database/db';

export interface Booking {
  id?: number;
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
  total_price?: number;
  status?: 'active' | 'cancelled' | 'returned';
}

export const createBooking = async (booking: Booking): Promise<any> => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status,
  } = booking;
  const result = await pool.query(
    `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status || 'active',
    ]
  );
  return result.rows[0];
};

export const getAllBookings = async (): Promise<any[]> => {
  const result = await pool.query(
    `SELECT b.*, u.name AS customer_name, u.email AS customer_email, v.vehicle_name, v.registration_number
     FROM bookings b
     JOIN users u ON b.customer_id = u.id
     JOIN vehicles v ON b.vehicle_id = v.id`
  );
  return result.rows;
};

export const getBookingsByCustomer = async (
  customer_id: number
): Promise<any[]> => {
  const result = await pool.query(
    `SELECT b.*, v.vehicle_name, v.registration_number, v.type
     FROM bookings b
     JOIN vehicles v ON b.vehicle_id = v.id
     WHERE b.customer_id = $1`,
    [customer_id]
  );
  return result.rows;
};

export const getBookingById = async (id: number): Promise<any> => {
  const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
  return result.rows[0] || null;
};

export const updateBooking = async (
  id: number,
  data: Partial<Booking>
): Promise<any> => {
  const fields = Object.keys(data)
    .map((key, i) => `${key}=$${i + 1}`)
    .join(', ');
  const values = Object.values(data);
  const result = await pool.query(
    `UPDATE bookings SET ${fields} WHERE id=$${values.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0] || null;
};
