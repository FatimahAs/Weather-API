import { Router } from 'express';
import {
  createCarMake,
  getCarMakes,
  getCarMake,
  updateCarMakes,
  deleteCarMake,
} from '../controllers/CarMake.controller';

const router = Router();

router.route('/')
  .get(getCarMakes)
  .post(createCarMake);
router.route('/:id')
  .get(getCarMake)
  .put(updateCarMakes)
  .delete(deleteCarMake);
export default router; 