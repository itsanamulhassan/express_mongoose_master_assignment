require("dotenv").config();

import app from "./app";
import connectDB from "./app/utils/db";

// Start the server and connect to the database
app.listen(process.env.PORT, () => {
  // Log confirmation that server is running
  console.log(
    `Library Management is connected to the port ${process.env.PORT}`
  );

  // Establish connection to MongoDB database
  connectDB();
});
