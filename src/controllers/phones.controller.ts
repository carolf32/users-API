import { Request, Response } from "express";
import { PhoneServices } from "../services/phones.services";

export class PhoneControllers {
  async create(req: Request, res: Response) {
    const phoneServices = new PhoneServices();

    const response = await phoneServices.create(req.body);
    return res.status(201).json(response);
  }
  async findOne(req: Request, res: Response) {
    const phoneServices = new PhoneServices();

    const response = await phoneServices.findOne(+req.params.id);
    return res.status(200).json(response);
  }
  async findMany(req: Request, res: Response) {
    const phoneServices = new PhoneServices();

    const category = req.query.category as string;
    const searchQuery = req.query.search as string;

    const response = await phoneServices.findMany(category, searchQuery);
    return res.status(200).json(response);
  }
  async update(req: Request, res: Response) {
    const phoneServices = new PhoneServices();

    const response = await phoneServices.update(+req.params.id, req.body);
    return res.status(200).json(response);
  }
  async remove(req: Request, res: Response) {
    const phoneServices = new PhoneServices();

    await phoneServices.remove(+req.params.id);
    return res.status(204).json();
  }
}
