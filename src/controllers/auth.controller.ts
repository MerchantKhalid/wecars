import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res
      .status(200)
      .json({ success: true, message: 'Login successful', data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
