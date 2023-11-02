"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
//handle token class
class JWTTokenManager {
    constructor() {
        this.secret = process.env.JWT_SECRET;
        this.expireIn = `7d`;
    }
    createToken(id) {
        try {
            const token = jsonwebtoken_1.default.sign({ id }, this.secret, { expiresIn: this.expireIn });
            return token;
        }
        catch (error) {
            throw new Error('Token creation failed');
        }
    }
    verifayToken(token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, this.secret);
            return payload;
        }
        catch (error) {
            throw new Error('Token verification failed');
        }
    }
}
exports.default = JWTTokenManager;
