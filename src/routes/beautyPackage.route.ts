import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middlewares';
import beautyPackageController from '../controllers/beautyPackage.controller';

const beautyPackageRouter: Router = express.Router();

const authInstance = new AuthMiddleware();
const beautyPackageInstance = new beautyPackageController();

//get all beauty Packages
beautyPackageRouter.get('/', beautyPackageInstance.getAllBeautyPackages);

//get a beauty package
beautyPackageRouter.get('/:bid', beautyPackageInstance.getABeautyPackage);

//create a beauty package
beautyPackageRouter.post(
  '/',
  authInstance.isAuthentcated,
  authInstance.isAdmin,
  beautyPackageInstance.createABeautyPackage
);

//update a beauty package
beautyPackageRouter.put(
  '/:bid',
  authInstance.isAuthentcated,
  authInstance.isAdmin,
  beautyPackageInstance.updateABeautyPackage
);

//delete a beauty package
beautyPackageRouter.delete(
  '/:bid',
  authInstance.isAuthentcated,
  authInstance.isAdmin,
  beautyPackageInstance.deleteABeautyPackage
);

export default beautyPackageRouter;
