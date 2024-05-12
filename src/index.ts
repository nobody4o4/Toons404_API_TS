import express, { Express, Request, Response, query } from "express";
import { PrismaClient } from "@prisma/client";
import rootRouter from "./routes/index.route";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";
import  errorMiddleware  from "./middleware/error.middleware";


export const prisma = new PrismaClient()

const app: Express = express();
const port: number = 3000;

// app.use(cors({
//   origin: ["http://localhost:4004","http://192.168.1.94:4004/","http://169.254.143.83:4004/"],
//   credentials: true
// }));
app.use(cors());
http://localhost:3000/api/khalti/callback?pidx=z4cSF2RLNqE7nMc9fsCUMh&transaction_id=8GPLWvVMCQKtsiYXLv4ruH&tidx=8GPLWvVMCQKtsiYXLv4ruH&amount=1000&total_amount=1000&mobile=98XXXXX248&status=Completed&purchase_order_id=00a27811-bdb3-4825-ae0e-a9152f4f0827&purchase_order_name=Subscription%20Premium
app.use(express.json());

app.use("/api", rootRouter);

app.use(errorHandler);

app.use(errorMiddleware)

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

