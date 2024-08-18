import { Request, Response } from "express";
import { UserServices } from "../services/users.services";

export class UserControllers {
  async create(req: Request, res: Response) {
    const userServices = new UserServices();

    const response = await userServices.create(req.body);
    return res.status(201).json(response);
  }

  async login(req: Request, res: Response) {
    const userServices = new UserServices();

    const response = await userServices.login(req.body);
    return res.status(200).json(response);
  }

  async getUser(req: Request, res: Response) {
    const userServices = new UserServices();
    const id = res.locals.decode.id;

    const response = await userServices.getUser(id);

    return res.status(200).json(response);
  }
}
