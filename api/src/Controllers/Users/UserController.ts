import mongoose from "mongoose";
import { user } from "../../types";
import User from "../../models/User";

export const newUser = async (Body: user) => {
  if (!Body.Email || !Body.Name || !Body.LastName || !Body.Password)
    throw Error("Info Missing");
  const userExist = await User.findOne({ Email: Body.Email });
  if (userExist) {
    throw Error("User already exist");
  } else {
    let newUsers = await User.create({ ...Body });
    return newUsers;
  }
};
