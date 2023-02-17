import { Request, Response } from "express";
import { Router } from "express";
import {
  getAllUsers,
  getUser,
  newUser,
} from "../Controllers/Users/UserController";
import { user } from "../types";
const userValidation = require("../middlewares/userValidation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const route = Router();

route.post("/users", async (req: Request, res: Response) => {
  const Body = req.body;

  try {
    const { _id, Email } = await newUser(Body);
    const id: string = _id.toString();
    const userForToken: object = { id, Email };
    const token = jwt.sign(userForToken, process.env.KEY);
    if (token) {
      res.status(200).send({ Email, token });
    }
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

route.post("/login", async (req: Request, res: Response) => {
  const body = req.body;
  const { Email, Password } = body;
  try {
    const user: user = await getUser(Email);
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(Password, user.Password);
    if (!user && !passwordCorrect) {
      return res.status(401).send({ message: "User or password invalid" });
    }
    const userForToken : object = {
      Email: user.Email,
      Name: user.Name,
      id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.KEY);
    return res
      .status(200)
      .send({ Email: user.Email, Name: user.Name, token: token });
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
});

route.get("/users", userValidation, async (req: Request, res: Response) => {
  try {
    const authorization = req.get("authorization");
    let token: string | undefined = authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.KEY);
    const Email : string = decodedToken.Email;
    const user : user = await (await getUser(Email)).populate("Posts");
    user ? res.status(200).send(user) : res.status(400).send("user not exist");
  } catch (err: any) {
    res.status(400).send({ err: err.message });
  }
});

route.get("/users", async (_req: Request, res: Response) => {
  try {
    const users: user = await getAllUsers();
    res.status(200).send(users);
  } catch (err: any) {
    res.status(400).send({ err: err.message });
  }
});

export default route;
