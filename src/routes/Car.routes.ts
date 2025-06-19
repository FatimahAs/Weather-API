import { Router } from 'express';
import {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
} from '../controllers/Car.controller';

const router = Router();

router.route('/')
  .get(getCars)
  .post(createCar);
router.route('/:id')
  .get(getCar)
  .put(updateCar)
  .delete(deleteCar);

export default router; 