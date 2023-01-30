import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes/index";

dotenv.config();
export const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.use("/", routes);
