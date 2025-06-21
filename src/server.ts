require("dotenv").config();
import app from "./app";
import connectDB from "./app/utils/db";

app.listen(process.env.PORT, () => {
  console.log(
    `Library Management is connected the port of ${process.env.PORT}`
  );
  connectDB();
});
