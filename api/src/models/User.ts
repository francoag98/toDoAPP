import mongoose, { Schema, Model, SchemaTypes } from "mongoose";

const userSchema = new Schema({
  Name: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Posts: [{ type: SchemaTypes.ObjectId, ref: "Post" }],
});
const User = mongoose.model("User", userSchema);

export default User;
