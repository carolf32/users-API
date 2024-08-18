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
exports.PhoneControllers = void 0;
const phones_services_1 = require("../services/phones.services");
class PhoneControllers {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const phoneServices = new phones_services_1.PhoneServices();
            const response = yield phoneServices.create(req.body);
            return res.status(201).json(response);
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const phoneServices = new phones_services_1.PhoneServices();
            const response = yield phoneServices.findOne(+req.params.id);
            return res.status(200).json(response);
        });
    }
    findMany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const phoneServices = new phones_services_1.PhoneServices();
            const response = yield phoneServices.findMany();
            return res.status(200).json(response);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const phoneServices = new phones_services_1.PhoneServices();
            const response = yield phoneServices.update(+req.params.id, req.body);
            return res.status(200).json(response);
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const phoneServices = new phones_services_1.PhoneServices();
            yield phoneServices.remove(+req.params.id);
            return res.status(204).json();
        });
    }
}
exports.PhoneControllers = PhoneControllers;
