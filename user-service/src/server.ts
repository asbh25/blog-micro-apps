import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import userRoutes from './routes/user.routes';
import { connectDB } from './config/database';


const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use('/', userRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`User Service running on http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();