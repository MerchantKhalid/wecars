import { pool } from '../server';

export interface Vehicle {
  id?: number;
  vehicle_name: string;
  type: 'car' | 'bike' | 'van' | 'SUV';
  registration_number: string;
  daily_rent_price: number;
  availability_status: 'available' | 'booked';
}

export const createVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = vehicle;
  const result = await pool.query(
    `INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result.rows[0];
};

export const getAllVehicles = async (): Promise<Vehicle[]> => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result.rows;
};

export const getVehicleById = async (id: number): Promise<Vehicle | null> => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
  return result.rows[0] || null;
};

export const updateVehicle = async (
  id: number,
  data: Partial<Vehicle>
): Promise<Vehicle | null> => {
  const fields = Object.keys(data)
    .map((key, i) => `${key}=$${i + 1}`)
    .join(', ');
  const values = Object.values(data);
  const result = await pool.query(
    `UPDATE vehicles SET ${fields} WHERE id=$${values.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0] || null;
};

export const deleteVehicle = async (id: number): Promise<void> => {
  await pool.query(`DELETE FROM vehicles WHERE id=$1`, [id]);
};
