import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './utils/logger';
import { dev, port } from './utils/helpers';
import authRoutes from './routes/Auth.routes';
import { OK, INTERNAL_SERVER_ERROR } from './utils/http-status';
import { connectDB } from './db/Mongoose';

import { getWeather } from './controllers/Weather.Controller';
import { getUserHistory } from './controllers/History.Controller';
import { authenticate } from './middleware/auth';


// Load environment variables
dotenv.config();

// Delete all collections
//deleteAllCollections();

// Connect to MongoDB
connectDB();


const app: Express = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('tiny', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.get('/weather', authenticate, getWeather);
app.get('/history', authenticate, getUserHistory);



// Basic route
app.get('/', (req: Request, res: Response) => {
  res
    .status(OK)
    .json({ message: 'Weather API - Welcome!' });
});

// Basic error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error:', err.message);
  res
    .status(INTERNAL_SERVER_ERROR)
    .json({
      success: false,
      message: 'Something went wrong!',
      error: dev ? err.message : undefined
    });
});

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
