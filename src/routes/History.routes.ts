import { Router } from 'express';
import { getUserHistory } from '../controllers/History.Controller';
import { authenticate } from '../middleware/auth';


const router = Router();

// Public routes
router.get('/history', authenticate, getUserHistory);

export default router;