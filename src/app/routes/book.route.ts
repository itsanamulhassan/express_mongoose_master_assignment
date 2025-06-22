import express from "express";
import { createBookSchema } from "../schemas/book.schema";
import {
  createBook,
  deleteBook,
  retrieveBook,
  retrieveBooks,
  updateBook,
} from "../controllers/book.controller";
import validateRequest from "../middlewares/validateRequest";

const bookRoute = express.Router();

bookRoute.post("/books", validateRequest(createBookSchema), createBook);
bookRoute.get("/books", retrieveBooks);
bookRoute.get("/books/:bookId", retrieveBook);
bookRoute.put("/books/:bookId", updateBook);
bookRoute.delete("/books/:bookId", deleteBook);

export default bookRoute;
