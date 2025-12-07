import express, { Request, Response } from 'express';
import { initDB } from './database/db';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import vehicleRoutes from './routes/vehicles.routes';
import bookingRoutes from './routes/bookings.routes';
dotenv.config({ path: path.join(process.cwd(), '.env') });

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

initDB();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/vehicles', vehicleRoutes);
app.use('/api/v1/bookings', bookingRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Mr');
});

app.listen(port, () => {
  console.log(`WeCars app listening on port ${port}`);
});
