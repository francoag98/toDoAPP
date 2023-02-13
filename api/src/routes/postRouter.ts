import { Request, Response } from "express";
import { Router } from "express";
import { getUser } from "../Controllers/Users/UserController";
import {
  getPost,
  getPosts,
  newPost,
} from "../Controllers/Posts/PostController";
const userValidation = require("../middlewares/userValidation");
const jwt = require("jsonwebtoken");

const route = Router();

route.post("/posts", userValidation, async (req: Request, res: Response) => {
  const body = req.body;
  const authorization = req.get("authorization");

  try {
    let token: String | undefined = authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.KEY);
    const Email = decodedToken.Email;
    const users = await getUser(Email);
    if (users) {
      const posts = await newPost(body, users._id);
      await users.updateOne({ Posts: [...users.Posts, posts] });
      users.save();
      res.status(200).send(posts);
    }
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

route.get("/posts", async (req: Request, res: Response) => {
  try {
    const posts = await getPosts();
    res.status(200).send(posts);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

route.get(
  "/posts/userSpecified",
  userValidation,
  async (req: Request, res: Response) => {
    try {
      const authorization = req.get("authorization");
      let token: String | undefined = authorization?.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.KEY);
      const { Email } = decodedToken;
      const postUser = await getPost(Email);
      if (postUser) {
        res.status(200).send(postUser);
      }
    } catch (error: any) {
      res.status(401).send({ error: error.message });
    }
  }
);
export default route;
