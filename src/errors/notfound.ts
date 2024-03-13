import { HttpException } from "./index.error";

export class NotFoundException extends HttpException {
    constructor(message: string,errorCode:any,errors:any) {
        super(message,errorCode,404,null);
    }
}