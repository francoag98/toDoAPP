import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes/index";
import cookieSession from "cookie-session";

dotenv.config();
export const server = express();
require("./mongo");
const CLIENT_URL = process.env.CLIENT;
server.use(express.json());
server.use(morgan("dev"));
server.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", CLIENT_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(
  cookieSession({
    name: "Session",
    keys: ["TodoApp"],
    maxAge: (24 * 60 * 60) ^ 100,
  })
);
server.use("/", routes);

server.listen(3001, () => {
  console.log(`Server Listening on port 3001`);
});
