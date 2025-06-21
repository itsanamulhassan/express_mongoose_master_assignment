require("dotenv").config();
import mongoose from "mongoose";

// Get the MongoDB connection URL from environment variables (fallback to empty string if not defined)
const dbUrl: string = process.env.DB_URL || "";

/**
 * Asynchronous function to connect to the MongoDB database
 * with automatic retry on failure.
 */
const connectDB = async () => {
  try {
    // Try to connect to MongoDB using mongoose
    await mongoose.connect(dbUrl).then((data: typeof mongoose) => {
      // Log a success message with host and port details
      console.log(
        `✅ Database connected with host: ${data.connection.host} and port: ${data.connection.port}`
      );
    });
  } catch (error) {
    // If an error occurs during connection
    if (error instanceof Error) {
      // Log the error message for debugging
      console.log(`❌ Database connection failed: ${error.message}`);

      // Retry connection after 5 seconds
      setTimeout(connectDB, 5000);
    }
  }
};

export default connectDB;
