import express from "express";
import validateRequest from "../middlewares/validateRequest";
import { createBookSchema } from "../schemas/book.schema";

const bookRoute = express.Router();

bookRoute.post("/books", validateRequest(createBookSchema));
bookRoute.get("/books/:bookId", validateRequest(createBookSchema));
bookRoute.get("/books", validateRequest(createBookSchema));
bookRoute.put("/books/:bookId", validateRequest(createBookSchema));
bookRoute.delete("/books/:bookId", validateRequest(createBookSchema));

export default bookRoute;
