import { Router } from 'express';
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicles.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/role.middleware';

const router = Router();

router.get('/', getVehicles);
router.get('/:vehicleId', getVehicleById);

router.post('/', authenticate, isAdmin, createVehicle);
router.put('/:vehicleId', authenticate, isAdmin, updateVehicle);
router.delete('/:vehicleId', authenticate, isAdmin, deleteVehicle);

export default router;
