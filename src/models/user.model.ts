import { pool } from '../server.js';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'customer';
}

export const createUser = async (user: User): Promise<User> => {
  const { name, email, password, phone, role } = user;
  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role)
     VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`,
    [name, email.toLowerCase(), password, phone, role]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email.toLowerCase(),
  ]);
  return result.rows[0] || null;
};
