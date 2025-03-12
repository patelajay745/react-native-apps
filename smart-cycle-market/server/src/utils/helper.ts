import { NextFunction, Request, RequestHandler, Response } from "express";

export class ApiError extends Error {
  message: string;
  statusCode: number;
  errors: any[];

  constructor(
    message: string = "Something went wrong ",
    statusCode: number,
    errors: any[] = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class ApiResponse {
  message: string;
  data: Object;
  success: boolean;

  constructor(message: string = "", data: Object = {}, statusCode: number) {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

// export const asyncHandler = (requestHandler: AsyncRequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//   };
// };

export function asyncHandler(asyncFn: RequestHandler): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(asyncFn(req, res, next)).catch(next);
  };
}
