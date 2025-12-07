import { Request, Response } from 'express';
import * as vehicleService from '../services/vehicles.service';

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await vehicleService.addVehicle(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: 'Vehicle created successfully',
        data: vehicle,
      });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await vehicleService.listVehicles();
    res
      .status(200)
      .json({
        success: true,
        message: vehicles.length
          ? 'Vehicles retrieved successfully'
          : 'No vehicles found',
        data: vehicles,
      });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const vehicle = await vehicleService.getVehicle(
      Number(req.params.vehicleId)
    );
    res
      .status(200)
      .json({
        success: true,
        message: 'Vehicle retrieved successfully',
        data: vehicle,
      });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await vehicleService.modifyVehicle(
      Number(req.params.vehicleId),
      req.body
    );
    res
      .status(200)
      .json({
        success: true,
        message: 'Vehicle updated successfully',
        data: vehicle,
      });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    await vehicleService.removeVehicle(Number(req.params.vehicleId));
    res
      .status(200)
      .json({ success: true, message: 'Vehicle deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
