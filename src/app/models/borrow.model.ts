import { model, Schema, Types } from "mongoose";
import { BorrowBook } from "../schemas/borrow.schema";

const borrowSchema = new Schema<BorrowBook>({
  book: {
    type: String || Types.ObjectId,
    required: [true, "Book id is required."],
  },
  quantity: {
    type: Number,
    required: [true, "Borrow quantity is required."],
    min: [1, "Borrow quantity must be at least 1."],
    validate: {
      validator: Number.isInteger,
      message: "Borrow quantity must be an integer.",
    },
  },
  dueDate: {
    type: String || Date,
    required: [true, "Due date is required"],
  },
});

export const BorrowBooks = model<BorrowBook>("BorrowBooks", borrowSchema);
