import { pool } from '../database/db';
import { User } from '../models/user.model';

export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users`
  );
  return result.rows;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users WHERE id=$1`,
    [id]
  );
  return result.rows[0] || null;
};

export const updateUser = async (
  id: number,
  data: Partial<User>,
  currentUser: { id: number; role: string }
): Promise<User> => {
  const user = await getUserById(id);
  if (!user) throw new Error('User not found');

  // Customers can only update their own profile
  if (currentUser.role === 'customer' && currentUser.id !== id) {
    throw new Error('Access denied');
  }

  const fields = Object.keys(data)
    .map((key, i) => `${key}=$${i + 1}`)
    .join(', ');
  const values = Object.values(data);

  const result = await pool.query(
    `UPDATE users SET ${fields} WHERE id=$${
      values.length + 1
    } RETURNING id, name, email, phone, role`,
    [...values, id]
  );

  return result.rows[0];
};

export const deleteUser = async (id: number): Promise<void> => {
  // Check for active bookings
  const res = await pool.query(
    `SELECT * FROM bookings WHERE customer_id=$1 AND status='active'`,
    [id]
  );
  if (res.rows.length > 0)
    throw new Error('Cannot delete user with active bookings');

  await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
};
