import express, { Application, NextFunction, Request, Response } from "express";
import ErrorMiddleware from "./middleware/error";

// Create an instance of the Express application
const app: Application = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

/**
 * Test route to verify if the server is running properly
 * Accessible via GET http://localhost:PORT/test
 */
app.get("/test", (_, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Library Management server is running",
  });
});

/**
 * Handle all unknown routes (404 Not Found)
 * This will catch any request that doesn't match the defined routes
 */
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  // Create a new error message for unmatched routes
  const message: any = new Error(
    `Route /${req.originalUrl.substring(1)}/ not found`
  );
  // Set custom status for the error
  message.status = 404;
  // Pass the error to the next middleware (which is our error handler)
  next(message);
});

/**
 * Centralized error-handling middleware
 * This will catch all errors passed by `next()` and send a proper response
 */
app.use(ErrorMiddleware);

export default app;
