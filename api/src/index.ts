import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes/index";

dotenv.config();
export const server = express();
require("./mongo");

server.use(express.json());
server.use(morgan("dev"));

server.use("/", routes);

server.listen(3000, () => {
  console.log(`Server Listening on port 3000`);
});
