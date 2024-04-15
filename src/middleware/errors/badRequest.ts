import { HttpException } from "./index.error";

export class BadRequestException extends HttpException {
    constructor(message: string,errorCode:any,errors:any) {
        super(message,errorCode,400,null);
        this.name = "BadRequestException";
    }
}