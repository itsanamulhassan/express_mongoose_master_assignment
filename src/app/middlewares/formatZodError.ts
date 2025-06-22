import { ZodError } from "zod";

/**
 * Formats a ZodError to mimic Mongoose's ValidationError structure.
 * This helps keep consistency in API error responses, even when using different validators (Zod vs Mongoose).
 *
 * @param error - The ZodError object thrown by Zod during schema validation
 * @returns A structured error object similar to how Mongoose sends validation errors
 */
const formatZodError = (error: ZodError) => {
  // Create an object to hold formatted errors for each invalid field
  const formattedErrors: Record<string, any> = {};

  // Zod error pattern sample
  //  issues: [
  //   {
  //     code: 'too_small',
  //     minimum: 0,
  //     type: 'number',
  //     inclusive: false,
  //     exact: false,
  //     message: 'Number of copies must be a positive number.',
  //     path: [Array]
  //   }
  // ],

  // Loop through each validation issue returned by Zod
  for (const issue of error.errors) {
    // Convert the field path array to a dot-separated string (e.g., "user.name")
    const field = issue.path.join(".");

    // Structure the error for this field similarly to Mongoose's ValidatorError
    formattedErrors[field] = {
      message: issue.message, // Human-readable error message
      name: "ValidatorError", // Mimic the standard error name used by Mongoose
      properties: {
        message: issue.message, // Same message again inside 'properties'
        type: issue.code, // Zod's error code (e.g., 'too_small', 'invalid_enum_value')

        // Conditionally include `min` and `max` values if the error type is about size
        ...(issue.code === "too_small" && issue.minimum !== undefined
          ? { min: issue.minimum }
          : {}),
        ...(issue.code === "too_big" && issue.maximum !== undefined
          ? { max: issue.maximum }
          : {}),
      },
      kind: issue.code, // The kind of validation error
      path: field, // The field name/path
    };
  }

  // Return the final formatted error response
  return {
    message: "Validation failed", // Generic message for all validation failures
    success: false, // Indicates the request was not successful
    error: {
      name: "ValidationError", // Overall error name
      errors: formattedErrors, // All field-specific error details
    },
  };
};

export default formatZodError;
