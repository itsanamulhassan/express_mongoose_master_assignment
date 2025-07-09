import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import { Book } from "../schemas/book.schema";
import { Books } from "../models/book.model";
import ErrorHandler from "../utils/errorHandler";
import { FilterQuery, Types } from "mongoose";
import MongooseQueryBuilder from "../utils/mongooseQueryBuilder";

// Create new book
export const createBook = catchAsyncError(
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

// Get all the books (filter=FANTASY&sortBy=createdAt&sort=desc&limit=5)
export const retrieveBooks = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = new MongooseQueryBuilder<typeof Books>(
      Books.find(),
      req.query
    );

    // Add query builder methods to the query
    query.search(["title", "author", "genre"]).paginate().sort();

    const books = await query.queryModel;

    // If no books are found, forward an error to error handling middleware
    if (!books) {
      return next(new ErrorHandler("Books not found!", 400));
    }
    // Count total documents and calculate pagination info
    const meta = await query.countTotal();

    // If books are found, send success response with books data
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      meta,
    });
  }
);

// Get single book by Id
export const retrieveBook = catchAsyncError(
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

// Update single book by Id
export const updateBook = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract bookId from route parameters
    const bookId = req.params.bookId as string;

    // Extract possible updated fields from request body, with default empty strings
    const { title = "", author = "", genre = "" } = req.body as Partial<Book>;

    // Check if another book exists with the same title, author, and genre but a different ID
    // This prevents duplicate entries with same key attributes
    const exists = await Books.exists({
      title,
      author,
      genre,
      _id: { $ne: bookId }, // Exclude current book from search
    });

    if (exists) {
      // If such a book exists, send an error to avoid duplication
      return next(
        new ErrorHandler(
          "A book with this title, author, and genre already exists.",
          400
        )
      );
    }

    // Update the book with only the fields provided in req.body
    // 'new: true' returns the updated document
    // 'runValidators: true' runs schema validators on update
    const updatedBook = await Books.findByIdAndUpdate(
      bookId,
      { $set: { ...req.body, available: true } },
      { new: true, runValidators: true }
    );

    // Send response with updated book data on success
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  }
);

// Delete single book by Id
export const deleteBook = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract bookId from route parameters
    const bookId = req.params.bookId as string;

    // Check before delete the book
    const bookExist = await Books.exists({ _id: bookId });
    if (!bookExist) {
      return next(new ErrorHandler("Invalid book id", 400));
    }

    // Delete the book document with the given Id from the database
    await Books.findByIdAndDelete(bookId);

    // Send success response with message and data set to null
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  }
);
