import mongoose, { Schema, Model } from "mongoose";

export const postSchema = new Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  User: { type: Schema.Types.ObjectId, ref: "User" },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
