import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;
export const NODE_ENV = process.env.NODE_ENV;

