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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneServices = void 0;
const prisma_1 = require("../database/prisma");
class PhoneServices {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.product.create({ data: body });
            return data;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.product.findUnique({ where: { id } });
            return data;
        });
    }
    findMany() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.product.findMany();
            return data;
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.product.update({ where: { id }, data: body });
            return data;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.product.delete({ where: { id } });
        });
    }
}
exports.PhoneServices = PhoneServices;
