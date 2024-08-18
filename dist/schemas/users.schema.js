"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userReturnSchema = exports.userLoginSchema = exports.userCreateSchema = exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSchema = zod_1.default.object({
    id: zod_1.default.number().positive(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(4),
    name: zod_1.default.string(),
    role: zod_1.default.enum(["User", "Employee"]),
    address: zod_1.default.string(),
    contact: zod_1.default.number(),
    createdAt: zod_1.default.date(),
});
exports.userCreateSchema = exports.userSchema
    .omit({
    id: true,
    createdAt: true,
})
    .partial({ role: true });
exports.userLoginSchema = exports.userSchema.pick({ email: true, password: true });
exports.userReturnSchema = exports.userCreateSchema.omit({
    password: true,
    role: true,
});
