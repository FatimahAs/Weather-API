import { Router } from 'express';
import * as AuthController from '../controllers/Auth.Controller';


const router = Router();

// Public routes
router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.post('/signout', AuthController.signOut);


export default router; 


