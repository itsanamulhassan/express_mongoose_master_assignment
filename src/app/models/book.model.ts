import { model, Schema } from "mongoose";
import { Book, genreEnum } from "../schemas/book.schema";
import { boolean } from "zod";

const bookSchema = new Schema<Book>({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  author: {
    type: String,
    trim: true,
    required: true,
  },
  genre: {
    type: String,
    uppercase: true,
    enum: {
      values: genreEnum,
      message: "Genre is not valid! got {VALUE}",
    },
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: [true, "ISBN must be an unique."],
    min: [10, "ISBN must be at least 10 characters long."],
    max: [18, "ISBN must be at most 13 characters long."],
  },
  description: {
    type: String,
    default: "",
  },
  copies: {
    type: Number,
    required: [true, "Number of copies is required."],
    min: [0, "Copies must be at least 0."],
    validate: {
      validator: Number.isInteger,
      message: "Copies must be an integer.",
    },
  },
  available: {
    Type: boolean,
    default: true,
  },
});

export const Books = model<Book>("Books", bookSchema);
