"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneUpdateSchema = exports.phoneCreateSchema = exports.phoneSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.phoneSchema = zod_1.default.object({
    id: zod_1.default.number().positive(),
    name: zod_1.default.string(),
    description: zod_1.default.string(),
    price: zod_1.default.number().positive(),
    stock: zod_1.default.number(),
    category: zod_1.default.string(),
    createdAt: zod_1.default.date(),
});
exports.phoneCreateSchema = exports.phoneSchema.omit({
    id: true,
    createdAt: true,
});
exports.phoneUpdateSchema = exports.phoneCreateSchema.partial();
