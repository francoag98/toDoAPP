import Post from "../../models/Post";

export const newPost = async (
  title: string,
  description: string,
  users: object
) => {
  if (!title || !description || !users) throw Error("info missing");
  const posts = await Post.create({ title, description, user: users });
  return posts;
};

export const getPosts = async () => {
  const posts = await Post.find();
  return posts;
};
