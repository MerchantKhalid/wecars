import express from 'express';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);

export default app;
