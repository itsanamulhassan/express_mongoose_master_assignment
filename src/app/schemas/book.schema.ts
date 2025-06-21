import * as z from "zod";

export const genreEnum = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
] as const;

export const createBookSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(100, { message: "Title cannot exceed 100 characters." }),

  author: z
    .string()
    .min(1, { message: "Author is required." })
    .max(100, { message: "Author name cannot exceed 100 characters." }),

  genre: z.enum(genreEnum, {
    errorMap: () => ({ message: "Please provide a valid genre." }),
  }),

  isbn: z
    .string()
    .min(10, { message: "ISBN must be at least 10 characters long." })
    .max(13, { message: "ISBN must be at most 13 characters long." }),

  description: z.string().optional(),

  copies: z
    .number({
      required_error: "Number of copies is required and cannot be negative.",
      invalid_type_error: "Number of copies must be a number.",
    })
    .int({ message: "Number of copies must be an integer." })
    .positive({ message: "Number of copies must be a positive number." }),

  available: z.boolean().default(true),
});

export type Book = z.infer<typeof createBookSchema>;
