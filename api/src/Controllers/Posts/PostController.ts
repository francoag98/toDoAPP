import Post from "../../models/Post";
import User from "../../models/User";
import { post, user } from "../../types";

export const newPost = async (body: post, user: object): Promise<post> => {
  if (!body || !user) throw Error("info missing");
  const posts: post | any = await Post.create({ ...body, user: user });
  return posts;
};

export const getPost = async (Email: String) => {
  if (!Email) throw Error("Post with that id do not exist");
  const user: user | any = await User.findOne({ Email: Email });
  const id: string = user._id;
  const posts: post | object = await Post.find({ _id: user?.Posts });
  if (!posts) throw Error("Post do not exist");
  const newObj = {
    userId: id,
    posts,
  };
  return newObj;
};

export const getPosts = async (): Promise<post> => {
  const posts: post | any = await Post.find();
  return posts;
};
