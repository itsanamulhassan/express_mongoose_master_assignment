import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncError";
import { Book } from "../schemas/book.schema";
import { Books } from "../models/book.model";
import ErrorHandler from "../utils/errorHandler";
import { Types } from "mongoose";

// Create new book
export const createBook = catchAsyncErrors(
  // Async controller to create a new book entry
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract relevant fields from the request body
    const { title, author, genre } = req.body as Book;

    // Prepare a filter object to check for an existing book with same title, author, and genre
    const filter = { title, author, genre };
    const bookExists = await Books.exists(filter);

    // If book already exists, forward an error to the error handling middleware
    if (bookExists) {
      return next(new ErrorHandler("Book already exists", 400));
    }

    // Create a new book record in the database
    const newBook = (await Books.create(req.body)) as Partial<Book>;

    // Respond with success and the newly created book data
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  }
);
// Get all the books ()
export const retrieveBooks = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract bookId from route parameters
    const bookId = req.params.bookId as string;

    // Find the book by ID in the database
    const book = (await Books.findById(bookId)) as Partial<Book>;

    // If no book is found, forward an error to error handling middleware
    if (!book) {
      return next(new ErrorHandler("Book not found!", 400));
    }

    // If book is found, send success response with book data
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  }
);

// Get single book by Id
export const retrieveBook = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract bookId from route parameters
    const bookId = req.params.bookId as string;

    // Find the book by ID in the database
    const book = (await Books.findById(bookId)) as Partial<Book>;

    // If no book is found, forward an error to error handling middleware
    if (!book) {
      return next(new ErrorHandler("Book not found!", 400));
    }

    // If book is found, send success response with book data
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  }
);
