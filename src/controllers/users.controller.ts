import { Request, Response } from 'express';
import * as userService from '../services/users.service';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res
      .status(200)
      .json({
        success: true,
        message: 'Users retrieved successfully',
        data: users,
      });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updated = await userService.updateUser(
      Number(req.params.userId),
      req.body,
      req.user!
    );
    res
      .status(200)
      .json({
        success: true,
        message: 'User updated successfully',
        data: updated,
      });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(Number(req.params.userId));
    res
      .status(200)
      .json({ success: true, message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
