import { HttpException } from "./index.error";

export class InternalErrors extends HttpException {
    constructor(message:string, errors:any, errorCode:number) {
        super(message,errorCode,500,errors);
    }
}   