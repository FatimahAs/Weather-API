import { Router } from 'express';
import { getWeather } from '../controllers/Weather.Controller';
import { authenticate } from '../middleware/auth';


const router = Router();

// Public routes
router.get('/weather', authenticate, getWeather);


export default router;