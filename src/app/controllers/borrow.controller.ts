import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import { BorrowBook } from "../schemas/borrow.schema";
import { Books } from "../models/book.model";
import ErrorHandler from "../utils/errorHandler";
import { BorrowBooks } from "../models/borrow.model";
import { Book } from "../schemas/book.schema";
import { Types } from "mongoose";

export const createBorrowBook = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { book: bookId, quantity: borrowQuantity } = req.body as BorrowBook;
    const updatedBook = (await Books.updateBookStatus(
      bookId,
      borrowQuantity
    )) as Partial<Book> & { _id: Types.ObjectId } & Partial<BorrowBook>;

    if (!updatedBook) {
      return next(
        new ErrorHandler("Book not found or insufficient copies", 400)
      );
    }

    const newBorrow = await BorrowBooks.create(req.body);

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      data: newBorrow,
    });
  }
);
