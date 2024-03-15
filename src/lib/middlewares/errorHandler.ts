import type { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../../constants/HTTPStatusCode";
import createHttpError from "http-errors";
import { HttpError } from "http-errors";

/**
 * custom error handler
 * @param err
 * @param _req
 * @param res
 * @param _next
 */
const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "internal server error",
    });
  }
};

/**
 * custom handler for  url path not found
 * @param req
 * @param _res
 * @param next
 */
const notFoundError = (req: Request, _res: Response, next: NextFunction) => {
  next(
    createHttpError(
      HttpStatusCodes.NOT_FOUND,
      `The requested URL ${req.url} was not found on this server`
    )
  );
};

export { notFoundError, errorHandler };
