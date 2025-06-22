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
    // Destructure book ID and requested quantity from the request body
    const { book: bookId, quantity: borrowQuantity } = req.body as BorrowBook;

    // Call static method to update book copies and availability status
    // If insufficient copies or book not found, this will return null
    const updatedBook = (await Books.updateBookStatus(
      bookId,
      borrowQuantity
    )) as Partial<Book> & { _id: Types.ObjectId } & Partial<BorrowBook>;

    // If the book doesn't exist or not enough copies, throw error
    if (!updatedBook) {
      return next(
        new ErrorHandler("Book not found or insufficient copies", 400)
      );
    }
    // If update succeeds, create a new borrow record in the database
    const newBorrow = await BorrowBooks.create(req.body);

    // Send a success response with the created borrow record
    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      data: newBorrow,
    });
  }
);

// Get summary of all borrowed books
export const borrowedSummary = catchAsyncError(
  async (_req: Request, res: Response, next) => {
    const summary = await BorrowBooks.aggregate([
      // Group borrow records by book ID and sum the quantities
      {
        $group: {
          _id: "$book", // Group by book ObjectId
          totalQuantity: { $sum: "$quantity" },
        },
      },
      // Join with books collection to get book details
      {
        $lookup: {
          from: "books", // Collection name in MongoDB
          localField: "_id", // Local book ID from BorrowBooks
          foreignField: "_id", // Match with Book _id
          as: "bookInfo",
        },
      },
      // Flatten the bookInfo array into an object
      {
        $unwind: "$bookInfo",
      },
      // Format the output
      {
        $project: {
          _id: 0, // Don't include the grouped _id field
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1, // Keep the computed total
        },
      },
    ]);

    // If no summary data found, return an error
    if (!summary.length) {
      return next(new ErrorHandler("No borrowed book records found", 404));
    }

    // Respond with summary data
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  }
);
