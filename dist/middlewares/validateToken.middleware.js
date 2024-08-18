"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateToken = void 0;
const appError_1 = require("../errors/appError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ValidateToken {
    static execute(req, res, next) {
        const authorization = req.headers.authorization;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "");
        if (!token) {
            throw new appError_1.appError(403, "Token is required");
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                throw new appError_1.appError(403, "Invalid token");
            }
            res.locals.decode = decoded;
            const userRole = res.locals.decode.role;
            if (userRole !== "Employee") {
                throw new appError_1.appError(403, "Access denied");
            }
        });
        next();
    }
}
exports.ValidateToken = ValidateToken;
