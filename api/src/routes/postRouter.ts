import { Request, Response } from "express";
import { Router } from "express";
import { getUser } from "../Controllers/Users/UserController";
import { getPosts, newPost } from "../Controllers/Posts/PostController";
import Post from "../models/Post";

const route = Router();

route.post("/posts", async (req: Request, res: Response) => {
  const { title, description, user } = req.body;
  console.log(user);
  console.log(title);
  console.log(description);

  try {
    const users = await getUser(user);
    if (users) {
      const posts = await newPost(title, description, users._id);
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
export default route;
