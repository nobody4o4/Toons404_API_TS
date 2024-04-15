import { NextFunction, Request, Response } from "express"
import { ErrorCodes, HttpException } from "./index.error";
import { InternalErrors } from "./internalErrors";

export const  errorHandler = (method : Function) =>{
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await method(req, res, next);
        }catch(error){
            let exception : HttpException;
            if( error instanceof HttpException){
                exception = error;

            }else{
                exception = new InternalErrors("Something went wrong", error.message, ErrorCodes.INTERNAL_SERVER_ERROR);
            }
            next(exception)
        }
    }
}