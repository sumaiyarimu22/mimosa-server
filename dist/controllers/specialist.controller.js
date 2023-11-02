"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const specialist_model_1 = __importDefault(require("../models/specialist.model"));
const handle_error_1 = require("../error/handle.error");
const mongoose_1 = __importDefault(require("mongoose"));
class specialistController {
    async getAllSpecialists(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const specialists = await specialist_model_1.default.find({});
                res.status(200).json(specialists);
            });
        }
        catch (error) {
            (0, handle_error_1.handleError)(error, res);
        }
    }
    async getASpecialist(req, res) {
        try {
            const { sid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(sid)) {
                res.status(404).json({ message: 'specialist not found' });
            }
            await Promise.resolve().then(async () => {
                const specialist = await specialist_model_1.default.findById(sid);
                res.status(200).json(specialist);
            });
        }
        catch (error) {
            (0, handle_error_1.handleError)(error, res);
        }
    }
    async createASpecialist(req, res) {
        try {
            const { name, designation, bio, photoUrl, dateOfBirth } = req.body;
            await Promise.resolve().then(async () => {
                const specialist = await specialist_model_1.default.create({
                    name,
                    designation,
                    bio,
                    photoUrl,
                    dateOfBirth,
                });
                res.status(200).json(specialist);
            });
        }
        catch (error) {
            (0, handle_error_1.handleError)(error, res);
        }
    }
    async updateASpecialist(req, res) {
        try {
            const { name, designation, bio, photoUrl, dateOfBirth } = req.body;
            const { sid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(sid)) {
                res.status(404).json({ message: 'specialist not found' });
            }
            await Promise.resolve().then(async () => {
                const specialist = await specialist_model_1.default.findByIdAndUpdate(sid, {
                    name,
                    designation,
                    bio,
                    photoUrl,
                    dateOfBirth,
                }, {
                    new: true,
                });
                res.status(200).json(specialist);
            });
        }
        catch (error) {
            (0, handle_error_1.handleError)(error, res);
        }
    }
    async deleteASpecialist(req, res) {
        try {
            const { sid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(sid)) {
                res.status(404).json({ message: 'specialist not found' });
            }
            await Promise.resolve().then(async () => {
                const specialist = await specialist_model_1.default.findByIdAndDelete(sid);
                res.status(200).json(specialist);
            });
        }
        catch (error) {
            (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = specialistController;
