import mongoose, { Schema } from "mongoose";

export const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
