import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middlewares';
import userController from '../controllers/user.controller';
const userRouter: Router = express.Router();

const authInstance = new AuthMiddleware();

const userInstance = new userController();

//get an user
userRouter.get('/:uid', authInstance.isAuthentcated, userInstance.getAnUser);

//delete an user
userRouter.delete(
  '/:uid',
  authInstance.isAuthentcated,
  userInstance.deleteAnUser
);

//update an user
userRouter.put('/:uid', authInstance.isAuthentcated, userInstance.updateAnUser);

//get all users
userRouter.get(
  '/',
  authInstance.isAuthentcated,
  authInstance.isAdmin,
  userInstance.getAllUser
);

export default userRouter;
