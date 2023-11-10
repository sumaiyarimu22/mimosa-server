import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middlewares';
import specialistController from '../controllers/specialist.controller';

const specialistRouter: Router = express.Router();

const authInstance = new AuthMiddleware();
const specialistInstance = new specialistController();

//get all specialists
specialistRouter.get('/', specialistInstance.getAllSpecialists);

//get a specialist
specialistRouter.get('/:sid', specialistInstance.getASpecialist);

//create a specialist
specialistRouter.post(
  '/:bid',
  authInstance.isAuthentcated,
  authInstance.isAdmin,
  specialistInstance.createASpecialist
);

//update a specialist
specialistRouter.put(
  '/:sid',
  authInstance.isAuthentcated,
  authInstance.isAdmin,
  specialistInstance.updateASpecialist
);

//delete a specialist
specialistRouter.delete(
  '/:sid',
  authInstance.isAuthentcated,
  authInstance.isAdmin,
  specialistInstance.deleteASpecialist
);

export default specialistRouter;
