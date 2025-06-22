import express from "express";
import validateRequest from "../middlewares/validateRequest";
import { borrowBookSchema } from "../schemas/borrow.schema";
import {
  borrowedSummary,
  createBorrowBook,
} from "../controllers/borrow.controller";

const borrowRoute = express.Router();

borrowRoute.post(
  "/borrow",
  validateRequest(borrowBookSchema),
  createBorrowBook
);
borrowRoute.get("/borrow", borrowedSummary);
export default borrowRoute;
