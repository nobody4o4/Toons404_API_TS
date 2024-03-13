import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // return res.status(err.getStatus()).send({
  //   sucess: false,
  //   message: err.getMessage(),
  // });

  return res.status(400).send({
    success: false,
    message: err?.message,
    errorCode: err?.errorCode,
  });
};



export default errorHandler;
