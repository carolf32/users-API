import "express-async-errors";
import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
import { userRouter } from "./routes/users.routes";
import { HandleErrors } from "./middlewares/handleErrors.middleware";
import { phoneRouter } from "./routes/phones.routes";

export const app = express();

app.use(cors());
app.use(helmet());
app.use(json());
app.use("/home", userRouter);
app.use("/products", phoneRouter);

app.use(HandleErrors.execute);
