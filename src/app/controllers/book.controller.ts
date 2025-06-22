import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncError";

const createBook = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {}
);
