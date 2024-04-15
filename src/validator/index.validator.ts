import { Request, Response, NextFunction } from "express";
import { ErrorCodes, HttpException } from "../middleware/errors/index.error";
import { BadRequestException } from "../middleware/errors/badRequest";

export const validatorResult = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
    });
    console.log(req.body);
    next();
  } catch (err) {
    next(new BadRequestException(err.message, ErrorCodes.CONFLICT , null));
  }


  // const e = result.errors?.reduce((acc, curr) => {
  //   acc.push(curr.msg);
  //   return acc;
  // }, []);
  // {
  //   password: {'', ''}
  //   email: {''
  // }

  // if (result.errors?.length) {
  //   throw new Error(result.errors[0]?.msg);
  // }
};
