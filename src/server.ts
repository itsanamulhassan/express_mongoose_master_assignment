import mongoose from "mongoose";
import { Server } from "http";
import config from "./app/config";
import app from "./app";

let server: Server;
const { port, database_url } = config;

async function main() {
  try {
    await mongoose.connect(database_url as string);
    server = app.listen(port, () => {
      console.log(`Library Management System is connected the port of ${port}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      // Log the error message for debugging
      console.log(`❌ Database connection failed: ${error.message}`);
    }
  }
}

main();
