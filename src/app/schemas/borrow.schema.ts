import { Schema, Types } from "mongoose";
import { z } from "zod";

export const borrowBookSchema = z.object({
  book: z.string().min(1, { message: "Book ID is required." }),

  quantity: z
    .number({
      required_error: "Quantity is required.",
      invalid_type_error: "Quantity must be a number.",
    })
    .int({ message: "Quantity must be an integer." })
    .positive({ message: "Quantity must be a positive number." }),

  dueDate: z
    .string({
      required_error: "Due date is required.",
      invalid_type_error: "Due date must be a valid ISO date string.",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Due date must be a valid date.",
    }),
});

export type BorrowBook = Omit<z.infer<typeof borrowBookSchema>, "book"> & {
  book: Schema.Types.ObjectId;
};
