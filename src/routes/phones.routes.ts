import { Router } from "express";
import { PhoneControllers } from "../controllers/phones.controller";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { phoneCreateSchema, phoneUpdateSchema } from "../schemas/phones.schema";
import { IsIdValid } from "../middlewares/isIdValid.middleware";
import { ValidateToken } from "../middlewares/validateToken.middleware";

export const phoneRouter = Router();

const phoneControllers = new PhoneControllers();

phoneRouter.post(
  "/",
  ValidateToken.execute,
  ValidateBody.execute(phoneCreateSchema),
  phoneControllers.create
);
phoneRouter.get("/", phoneControllers.findMany);
phoneRouter.get("/:id", IsIdValid.execute, phoneControllers.findOne);
phoneRouter.patch(
  "/:id",
  ValidateToken.execute,
  ValidateBody.execute(phoneUpdateSchema),
  IsIdValid.execute,
  phoneControllers.update
);
phoneRouter.delete(
  "/:id",
  ValidateToken.execute,
  IsIdValid.execute,
  phoneControllers.remove
);
