import { Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";

const ErrorMiddleware = (error: any, _: Request, res: Response) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal server error";

  // Invalid mong id error
  if (error.name === "CastError") {
    const message: string = `Resource not found. Invalid: ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({ success: false, message: error.message });
};

export default ErrorMiddleware;
