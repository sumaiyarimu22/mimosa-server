"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
const specialist_controller_1 = __importDefault(require("../controllers/specialist.controller"));
const specialistRouter = express_1.default.Router();
const authInstance = new auth_middlewares_1.default();
const specialistInstance = new specialist_controller_1.default();
//get all specialists
specialistRouter.get('/', specialistInstance.getAllSpecialists);
//get a specialist
specialistRouter.get('/:sid', specialistInstance.getASpecialist);
//create a specialist
specialistRouter.post('/', authInstance.isAuthentcated, authInstance.isAdmin, specialistInstance.createASpecialist);
//update a specialist
specialistRouter.put('/:sid', authInstance.isAuthentcated, authInstance.isAdmin, specialistInstance.updateASpecialist);
//delete a specialist
specialistRouter.delete('/:sid', authInstance.isAuthentcated, authInstance.isAdmin, specialistInstance.deleteASpecialist);
exports.default = specialistRouter;
