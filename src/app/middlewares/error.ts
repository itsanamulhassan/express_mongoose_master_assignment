import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";

const ErrorMiddleware = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal server error";

  // ✅ Handle Mongoose CastError (invalid ObjectId)
  if (error.name === "CastError") {
    const message = `Resource not found. Invalid: ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  // ✅ Fallback response for other errors
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export default ErrorMiddleware;
