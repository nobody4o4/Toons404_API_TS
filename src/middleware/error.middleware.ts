import { Request, Response, NextFunction } from "express";
import { HttpException } from "../errors/index.error";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    console.log("error h bhai")
    res.status(error.statusCode).json({
        message : error.message,
        errorCode: error.errorCode,
        errors: error.errors
    })
    console.log("error")
console.log(error.message, error.statusCode, error.errorCode, error.errors)
console.log("error")
}

export default errorMiddleware;