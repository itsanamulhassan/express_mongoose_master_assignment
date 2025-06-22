import { Model, model, Schema, Types } from "mongoose";
import { Book, genreEnum } from "../schemas/book.schema";

interface BookModelType extends Model<Book> {
  updateBookStatus(
    bookId: Schema.Types.ObjectId,
    quantity: number
  ): Promise<Book>;
}

const bookSchema = new Schema<Book>(
  {
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
      required: [true, "Number of book copies is required."],
      min: [0, "Number of book copies must be at least 0."],
      validate: {
        validator: Number.isInteger,
        message: "Number of book copies must be an integer.",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// Static method for update the book collection when someone will borrow book
bookSchema.static(
  "updateBookStatus",
  async function (bookId: Types.ObjectId, quantity: number): Promise<Book> {
    const book = await this.findById(bookId);
    if (!book) {
      throw new Error("Book not found.");
    }

    if (book.copies < quantity) {
      throw new Error("Not enough copies available.");
    }
    book.copies -= quantity;
    if (book.copies === 0) {
      book.available = false;
    }

    await book.save();
    return book;
  }
);

export const Books = model<Book, BookModelType>("Books", bookSchema);
