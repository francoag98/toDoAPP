import Post from "../../models/Post";
import { post } from "../../types";

export const newPost = async (body: post, user: object) => {
  if (!body || !user) throw Error("info missing");
  const posts = await Post.create({ ...body, user: user });
  return posts;
};

export const getPosts = async () => {
  const posts = await Post.find();
  return posts;
};
