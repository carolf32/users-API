"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
const users_schema_1 = require("../schemas/users.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserServices {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prisma_1.prisma.user.findFirst({
                where: { email: body.email },
            });
            if (existingUser) {
                throw new appError_1.appError(404, "User already exists");
            }
            const hashPassword = yield bcrypt_1.default.hash(body.password, 10);
            const newUser = Object.assign(Object.assign({}, body), { password: hashPassword, role: body.role || "User" });
            const data = yield prisma_1.prisma.user.create({ data: newUser });
            return users_schema_1.userReturnSchema.parse(data);
        });
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.user.findUnique({
                where: { email: body.email },
            });
            if (!data) {
                throw new appError_1.appError(404, "User not registered");
            }
            const compare = yield bcrypt_1.default.compare(body.password, data.password);
            if (!compare) {
                throw new appError_1.appError(404, "Email and password doesn't match");
            }
            const token = jsonwebtoken_1.default.sign({ id: data.id, role: data.role }, process.env.JWT_SECRET);
            return { accessToken: token, user: users_schema_1.userReturnSchema.parse(data) };
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findFirst({ where: { id } });
            return users_schema_1.userReturnSchema.parse(user);
        });
    }
}
exports.UserServices = UserServices;
