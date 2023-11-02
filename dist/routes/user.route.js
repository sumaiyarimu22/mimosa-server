"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRouter = express_1.default.Router();
const authInstance = new auth_middlewares_1.default();
const userInstance = new user_controller_1.default();
//get an user
userRouter.get('/:uid', authInstance.isAuthentcated, userInstance.getAnUser);
//delete an user
userRouter.delete('/:uid', authInstance.isAuthentcated, userInstance.deleteAnUser);
//update an user
userRouter.put('/:uid', authInstance.isAuthentcated, userInstance.updateAnUser);
//get all users
userRouter.get('/', authInstance.isAuthentcated, authInstance.isAdmin, userInstance.getAllUser);
exports.default = userRouter;
