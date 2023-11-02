"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const handle_error_1 = require("../error/handle.error");
class userController {
    async getAnUser(req, res) {
        var _a;
        try {
            const { uid } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!mongoose_1.default.Types.ObjectId.isValid(uid)) {
                res.status(404).json({ message: 'User not found' });
            }
            if (uid !== userId.toString()) {
                res.status(401).json({ message: 'Unauthorize' });
            }
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findById(uid);
                res.status(200).json(user);
            });
        }
        catch (error) {
            (0, handle_error_1.handleError)(error, res);
        }
    }
    async deleteAnUser(req, res) {
        var _a;
        try {
            const { uid } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!mongoose_1.default.Types.ObjectId.isValid(uid)) {
                res.status(404).json({ message: 'User not found' });
            }
            if (uid !== userId.toString()) {
                res.status(401).json({ message: 'Unauthorize' });
            }
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findByIdAndDelete(uid).populate('bookings');
                res.status(200).json(user);
            });
        }
        catch (error) {
            (0, handle_error_1.handleError)(error, res);
        }
    }
    async updateAnUser(req, res) {
        var _a;
        try {
            const { uid } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { name, photoUrl, address, phoneNumber } = req.body;
            if (!mongoose_1.default.Types.ObjectId.isValid(uid)) {
                res.status(404).json({ message: 'User not found' });
            }
            if (uid !== userId.toString()) {
                res.status(401).json({ message: 'Unauthorize' });
            }
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findByIdAndUpdate(uid, {
                    name,
                    photoUrl,
                    address,
                    phoneNumber,
                }, {
                    new: true,
                });
                res.status(200).json(user);
            });
        }
        catch (error) {
            (0, handle_error_1.handleError)(error, res);
        }
    }
    async getAllUser(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const users = await user_model_1.default.find({});
                res.status(200).json(users);
            });
        }
        catch (error) {
            (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = userController;
