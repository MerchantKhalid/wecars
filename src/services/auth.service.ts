import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, createUser, findUserByEmail } from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = 10;

export const registerUser = async (userData: User) => {
  // Check if user already exists
  const existingUser = await findUserByEmail(userData.email);
  if (existingUser) throw new Error('Email already registered');

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  userData.password = hashedPassword;

  // Save user
  const newUser = await createUser(userData);
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};
