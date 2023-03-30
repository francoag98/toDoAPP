import { Request, Response } from "express";
import { Router } from "express";
import {
  getAllUsers,
  getUser,
  newUser,
} from "../Controllers/Users/UserController";
import { user } from "../types";
import { serialize } from "cookie";
const userValidation = require("../middlewares/userValidation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const route = Router();

route.post("/users", async (req: Request, res: Response) => {
  const Body = req.body;

  try {
    const { _id, email } = await newUser(Body);
    const id: string = _id.toString();
    const userForToken: object = { id, email };
    const token = jwt.sign(userForToken, process.env.KEY);
    if (token) {
      res.status(200).send({ email, token });
    }
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

route.post("/login", async (req: Request, res: Response) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const user = await getUser(email);
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);
    console.log(passwordCorrect);

    if (!passwordCorrect || !user) {
      return res.status(401).send({ message: "User or password invalid" });
    }
    const userForToken: object = {
      Email: user.email,
      Name: user.name,
      id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.KEY);

    const serialized = serialize("myTokenName", token, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);

    return res
      .status(200)
      .send({ Email: user.email, Name: user.name, token: token });
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
});

route.get("/users", async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (err: any) {
    res.status(400).send({ err: err.message });
  }
});

route.get(
  "/users/token",
  userValidation,
  async (req: Request, res: Response) => {
    const authorization = req.get("authorization");

    try {
      let token: string | undefined = authorization?.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.KEY);
      const Email: string = decodedToken.Email;
      const user: user = await (await getUser(Email)).populate("posts");
      user
        ? res.status(200).send(user)
        : res.status(400).send("user not exist");
    } catch (err: any) {
      res.status(400).send({ err: err.message });
    }
  }
);

export default route;
