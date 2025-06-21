/**
 * Custom ErrorHandler class that extends the built-in Error class.
 * Used to create and handle application-specific errors with a custom status code.
 */
class ErrorHandler extends Error {
  // HTTP status code associated with the error
  statusCode: number;

  /**
   * Constructor for creating an instance of ErrorHandler.
   * @param message - A descriptive error message.
   * @param statusCode - The HTTP status code to be associated with this error.
   */
  constructor(message: string, statusCode: number) {
    // Call the parent Error class constructor with the message
    super(message);

    // Set the custom status code
    this.statusCode = statusCode;

    // Capture the stack trace (helps with debugging by showing where the error was created)
    Error.captureStackTrace(this, this.constructor);
  }
}
