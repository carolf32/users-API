import { prisma } from "../database/prisma";
import { appError } from "../errors/appError";
import {
  TUserCreate,
  TUserLogin,
  userReturnSchema,
} from "../schemas/users.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserServices {
  async create(body: TUserCreate) {
    const existingUser = await prisma.user.findFirst({
      where: { email: body.email },
    });
    if (existingUser) {
      throw new appError(404, "User already exists");
    }

    const hashPassword = await bcrypt.hash(body.password, 10);

    const newUser = {
      ...body,
      password: hashPassword,
      role: body.role || "User",
    };

    const data = await prisma.user.create({ data: newUser });

    return userReturnSchema.parse(data);
  }

  async login(body: TUserLogin) {
    const data = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!data) {
      throw new appError(404, "User not registered");
    }

    const compare = await bcrypt.compare(body.password, data.password);

    if (!compare) {
      throw new appError(404, "Email and password doesn't match");
    }

    const token = jwt.sign(
      { id: data.id, role: data.role },
      process.env.JWT_SECRET as string
    );

    return { accessToken: token, user: userReturnSchema.parse(data) };
  }

  async getUser(id: number) {
    const user = await prisma.user.findFirst({ where: { id } });

    return userReturnSchema.parse(user);
  }
}
