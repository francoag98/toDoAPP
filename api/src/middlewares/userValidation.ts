import { Request } from "express";
import User from "../models/User";
const jwt = require("jsonwebtoken");

module.exports = async (req: any, res: any, next: any) => {
  const authorization = req.get("authorization");
  
  let token = null;
  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1]; // obtenemos el token del authorization 'bearer token'
  }
  if (!token) {
    return res.status(401).json({ error: "token missing or invalid admin" });
  } else {
    const decodedToken = jwt.verify(token, process.env.KEY);
    let user = null;
    if (decodedToken) {
      user = await User.findOne({ _id: decodedToken.id });
    }
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid admin" });
    }
    const { id } = decodedToken;
    req.id = id;
    return next();
  }
};
