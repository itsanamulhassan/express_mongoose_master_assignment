import express, { Application, NextFunction, Request, Response } from "express";
import ErrorMiddleware from "./app/middlewares/error";
import ErrorHandler from "./app/utils/errorHandler";
import bookRoute from "./app/routes/book.route";
import borrowRoute from "./app/routes/borrow.route";
import cors from "cors";
import config from "./app/config";

// Create an instance of the Express application
const app: Application = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

app.use(express.json({ limit: "10mb" }));

// Cors -- Cross origin for resource sharing
app.use(
  cors({
    origin: [config.development_origin || ""],
    credentials: true,
  })
);

/**
 * Test route to verify if the server is running properly
 * Accessible via GET http://localhost:PORT/test
 */
app.get("/", (_, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Library Management server is running",
  });
});

// All routes
app.use("/api", bookRoute, borrowRoute);

/**
 * Catch-all middleware for handling unknown routes (404 Not Found).
 * This middleware runs after all route handlers.
 * If no route matched the request, it creates a 404 error and passes it to the error handler.
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ErrorHandler(`Route ${req.originalUrl} not found`, 404));
});
/**
 * Centralized error-handling middleware
 * This will catch all errors passed by `next()` and send a proper response
 */
app.use(ErrorMiddleware);

export default app;
