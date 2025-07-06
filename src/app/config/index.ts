import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  development_origin: process.env.DEVELOPMENT_ORIGIN,
  production_origin: process.env.PRODUCTION_ORIGIN,
};
