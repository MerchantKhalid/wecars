import { Router } from 'express';
import {
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/users.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/role.middleware';

const router = Router();

router.get('/', authenticate, isAdmin, getUsers);
router.put('/:userId', authenticate, updateUser); // Admin or self
router.delete('/:userId', authenticate, isAdmin, deleteUser);

export default router;
