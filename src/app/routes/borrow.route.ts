import express from "express";
import validateRequest from "../middlewares/validateRequest";
import { borrowBookSchema } from "../schemas/borrow.schema";
import { createBorrowBook } from "../controllers/borrow.controller";

const borrowRoute = express.Router();

borrowRoute.post(
  "/borrow",
  validateRequest(borrowBookSchema),
  createBorrowBook
);
borrowRoute.get("/borrow", createBorrowBook);
export default borrowRoute;
