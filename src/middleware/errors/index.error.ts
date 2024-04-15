export class HttpException extends Error {
    
    message: string;
    errorCode:any;
    statusCode: number;
    errors:any;

    

  constructor(message: string, errorCode:ErrorCodes,statusCode: number,errors:any) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.errorCode=errorCode;
    this.errors=errors;

  }
}

export function isHttpException(err: any): err is HttpException {
  return err instanceof HttpException;
}


export enum ErrorCodes{
    //all possible error codes
    USER_ALREADY_EXIST=1000,
    USER_NOT_FOUND=1001,
    INVALID_PASSWORD=1002,
    INVALID_EMAIL=1003,
    INVALID_TOKEN=1004,
    INVALID_REFRESH_TOKEN=1005,
    INVALID_CREDENTIALS=1006,
    INVALID_FILE_FORMAT=1007,
    INVALID_FILE_SIZE=1008,
    INVALID_FILE=1009,
    INVALID_GENRE=1010,
    INVALID_NOVEL=1011,
    INVALID_CHAPTER=1012,
    INVALID_COMMENT=1013,
    INVALID_REACTION=1014,
    
    NOT_FOUND=404,
    INTERNAL_SERVER_ERROR=500,
    BAD_REQUEST=400,
    UNAUTHORIZED=401,
    FORBIDDEN=403,
    CONFLICT=409,
    UNPROCESSABLE_ENTITY=422,
    TOO_MANY_REQUESTS=429
}