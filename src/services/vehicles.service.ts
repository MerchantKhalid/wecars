import {
  Vehicle,
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from '../models/vehicle.model';
import { pool } from '../database/db';

export const addVehicle = async (vehicleData: Vehicle) => {
  return await createVehicle(vehicleData);
};

export const listVehicles = async () => {
  return await getAllVehicles();
};

export const getVehicle = async (id: number) => {
  const vehicle = await getVehicleById(id);
  if (!vehicle) throw new Error('Vehicle not found');
  return vehicle;
};

export const modifyVehicle = async (id: number, data: Partial<Vehicle>) => {
  const vehicle = await updateVehicle(id, data);
  if (!vehicle) throw new Error('Vehicle not found or update failed');
  return vehicle;
};

export const removeVehicle = async (id: number) => {
  // Check active bookings
  const res = await pool.query(
    `SELECT * FROM bookings WHERE vehicle_id=$1 AND status='active'`,
    [id]
  );
  if (res.rows.length > 0)
    throw new Error('Cannot delete vehicle with active bookings');

  await deleteVehicle(id);
};
