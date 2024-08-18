import { NextFunction, Request, Response } from "express";
import { appError } from "../errors/appError";
import jwt, { JwtPayload } from "jsonwebtoken";

export class ValidateToken {
  static execute(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      throw new appError(403, "Token is required");
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        throw new appError(403, "Invalid token");
      }

      res.locals.decode = decoded as JwtPayload;

      const userRole = res.locals.decode.role;

      if (userRole !== "Employee") {
        throw new appError(403, "Access denied");
      }
    });

    next();
  }
}
