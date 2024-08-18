import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { appError } from "../errors/appError";

export class IsIdValid {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const product = await prisma.product.findFirst({ where: { id: +id } });

    if (!product) {
      throw new appError(404, "Product not found");
    }

    next();
  }
}
