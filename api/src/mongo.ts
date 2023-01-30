const mongoose = require("mongoose");
import dotenv from "dotenv";

dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.qjjhpjf.mongodb.net/${DB_NAME}`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(mongoose.connection.readyState))
  .catch((error: any) => console.error(error));
