import { Router } from "express";
import { UserControllers } from "../controllers/users.controllers";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/users.schema";
import { ValidateToken } from "../middlewares/validateToken.middleware";

export const userRouter = Router();

const userControllers = new UserControllers();

userRouter.post(
  "/signup",
  ValidateBody.execute(userCreateSchema),
  userControllers.create
);
userRouter.post("/login", userControllers.login);
userRouter.get("/", ValidateToken.execute, userControllers.getUser);
