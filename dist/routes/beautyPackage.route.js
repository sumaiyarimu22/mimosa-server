"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
const beautyPackage_controller_1 = __importDefault(require("../controllers/beautyPackage.controller"));
const beautyPackageRouter = express_1.default.Router();
const authInstance = new auth_middlewares_1.default();
const beautyPackageInstance = new beautyPackage_controller_1.default();
//get all beauty Packages
beautyPackageRouter.get('/', beautyPackageInstance.getAllBeautyPackages);
//get a beauty package
beautyPackageRouter.get('/:bid', beautyPackageInstance.getABeautyPackage);
//create a beauty package
beautyPackageRouter.post('/', authInstance.isAuthentcated, authInstance.isAdmin, beautyPackageInstance.createABeautyPackage);
//update a beauty package
beautyPackageRouter.put('/:bid', authInstance.isAuthentcated, authInstance.isAdmin, beautyPackageInstance.updateABeautyPackage);
//delete a beauty package
beautyPackageRouter.delete('/:bid', authInstance.isAuthentcated, authInstance.isAdmin, beautyPackageInstance.deleteABeautyPackage);
exports.default = beautyPackageRouter;
