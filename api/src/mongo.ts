import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@todoapp.ri3ptno.mongodb.net/${DB_NAME}`;

mongoose.set("strictQuery", false);
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(connectionString, OPTIONS as ConnectOptions)
  .then(() => console.log(mongoose.connection.readyState))
  .catch((error: any) => console.error(error));
