import express from "express";
import { createBookSchema } from "../schemas/book.schema";
import { createBook, retrieveBook } from "../controllers/book.controller";
import validateRequest from "../middlewares/validateRequest";

const bookRoute = express.Router();

bookRoute.post("/books", validateRequest(createBookSchema), createBook);
bookRoute.get("/books", validateRequest(createBookSchema));
bookRoute.get("/books/:bookId", retrieveBook);
bookRoute.put("/books/:bookId", validateRequest(createBookSchema));
bookRoute.delete("/books/:bookId", validateRequest(createBookSchema));

export default bookRoute;
