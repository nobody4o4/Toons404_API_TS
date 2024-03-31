import express, { Express, Request, Response, query } from "express";
import { PrismaClient } from "@prisma/client";
import rootRouter from "./routes/index.route";
import RegisterValidator from "./validator/user.validator";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";
import  errorMiddleware  from "./middleware/error.middleware";
import { HttpException } from "./errors/index.error";

export const prisma = new PrismaClient()

const app: Express = express();
const port: number = 3000;

app.use(cors());

app.use(express.json());


app.use("/api", rootRouter);

app.use(errorHandler);

app.use(errorMiddleware)

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

