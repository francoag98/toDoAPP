import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes/index";
import cookieParser from "cookie-parser";

dotenv.config();
export const server = express();
require("./mongo");
const CLIENT_URL = process.env.CLIENT;
const PORT = process.env.PORT || 3001;
server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use("/", routes);

server.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
