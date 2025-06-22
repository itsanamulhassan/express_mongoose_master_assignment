import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

/**
 * Middleware factory to validate incoming request bodies using a Zod schema.
 * @param schema - A Zod schema defining the expected structure and validations of the request body.
 * @returns Express middleware function that validates req.body and passes control to next middleware.
 */
const validateRequest =
  <T>(schema: ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse and validate req.body according to the provided Zod schema.
      // Throws an error if validation fails.
      const validatedData = schema.parse(req.body);

      // Attach the validated and parsed data to req.validateData for use in later middlewares/handlers.
      req.validateData = validatedData;

      // If validation succeeds, proceed to the next middleware/route handler.
      next();
    } catch (error) {
      // If validation fails, send a 400 Bad Request response with the error message.

      if (error instanceof Error) {
        res.status(400).json({
          error: error.message || "Validation error",
        });
      } else {
        // Fallback error message if the thrown error is not an instance of Error.
        res.status(400).json({
          error: "Validation error",
        });
      }
    }
  };

export default validateRequest;
